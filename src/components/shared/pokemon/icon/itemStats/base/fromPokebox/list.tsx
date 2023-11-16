import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {IconWithInfo} from '@/components/shared/common/image/iconWithInfo';
import {
  PokemonItemStatsFromPokeboxCommonProps,
} from '@/components/shared/pokemon/icon/itemStats/base/fromPokebox/type';
import {PokemonItemStatsList} from '@/components/shared/pokemon/icon/itemStats/base/list';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {PokemonNatureIndicator} from '@/components/shared/pokemon/nature/indicator/main';
import {PokemonProducingRateSingleAtItem} from '@/components/shared/pokemon/production/single/item';
import {PokemonSubSkillIndicator} from '@/components/shared/pokemon/subSkill/indicator';
import {imageIconSizes} from '@/styles/image';
import {getEvolutionCountFromPokemonInfo} from '@/utils/game/pokemon';
import {getEffectiveIngredientProductions} from '@/utils/game/producing/ingredients';
import {getProducingRateSingleParams} from '@/utils/game/producing/params';
import {getPokemonProducingParams, getPokemonProducingRate} from '@/utils/game/producing/pokemon';
import {getTotalEnergyOfPokemonProducingRate} from '@/utils/game/producing/rateReducer';
import {isNotNullish} from '@/utils/type';


export const PokemonItemStatsFromPokeboxList = ({
  targetSpecialty,
  getIcon,
  pokedex,
  pokemonProducingParamsMap,
  berryDataMap,
  filter,
  pokeInBoxList,
  ...props
}: PokemonItemStatsFromPokeboxCommonProps) => {
  const {getItemRate, subSkillMap} = props;

  const t = useTranslations('Game');
  const producingStats = React.useMemo(() => (
    pokeInBoxList
      .map((pokeInBox) => {
        const pokemonInfo = pokedex[pokeInBox.pokemon];

        if (!pokemonInfo || !filter.internal({pokeInBox, pokemonInfo})) {
          return null;
        }

        return {pokeInBox, pokemonInfo};
      })
      .filter(isNotNullish)
      .map(({pokeInBox, pokemonInfo: pokemon}) => {
        const ingredients = getEffectiveIngredientProductions(pokeInBox);
        const singleParams = getProducingRateSingleParams({
          ...props,
          ...pokeInBox,
        });
        const pokemonRate = getPokemonProducingRate({
          ...props,
          level: pokeInBox.level,
          pokemon,
          pokemonProducingParams: getPokemonProducingParams({
            pokemonId: pokemon.id,
            pokemonProducingParamsMap,
          }),
          snorlaxFavorite: {},
          ...singleParams,
          berryData: berryDataMap[pokemon.berry.id],
          ingredients,
          evolutionCount: getEvolutionCountFromPokemonInfo({pokemon}),
        });

        return {
          pokemon,
          pokeInBox,
          pokemonRate,
          identifier: pokeInBox.uuid,
          ingredients,
          dailyTotalEnergy: getTotalEnergyOfPokemonProducingRate(pokemonRate),
        };
      })
  ), [pokeInBoxList]);

  return (
    <PokemonItemStatsList
      getItemRate={getItemRate}
      producingStats={producingStats}
      className="bg-plate"
      toItem={({
        pokemon,
        pokeInBox,
        ingredients,
        itemRate,
      }) => {
        const {id} = pokemon;
        const {
          level,
          name,
          nature,
          subSkill,
        } = pokeInBox;
        const pokemonDefaultName = t(`PokemonName.${id}`);

        return (
          <Flex center className="relative gap-1">
            <Flex noFullWidth className="absolute left-0 top-0 z-10 opacity-60">
              <IconWithInfo
                imageSrc={`/images/pokemon/icons/${id}.png`}
                imageAlt={pokemonDefaultName}
                imageDimension="h-14 w-14"
                imageSizes={imageIconSizes}
                info={level}
              />
            </Flex>
            <Flex className="place-items-end gap-1 text-sm">
              <div className="truncate">
                {name ?? pokemonDefaultName}
              </div>
              <PokemonIngredientIcons key="ingredients" ingredients={[ingredients]} noLink/>
              <PokemonProducingRateSingleAtItem
                rate={itemRate}
                getIcon={(dimension) => getIcon(pokemon, dimension)}
                hideFrequency
              />
            </Flex>
            <PokemonNatureIndicator nature={nature}/>
            <PokemonSubSkillIndicator subSkill={subSkill} subSkillMap={subSkillMap}/>
          </Flex>
        );
      }}
    />
  );
};
