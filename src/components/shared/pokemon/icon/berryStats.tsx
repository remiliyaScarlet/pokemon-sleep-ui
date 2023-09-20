import React from 'react';

import {useTranslations} from 'next-intl';

import {NextImage} from '@/components/shared/common/image/main';
import {PokemonIconsItemStats} from '@/components/shared/pokemon/icon/itemStats';
import {PokemonBerryStatsCommonProps} from '@/components/shared/pokemon/icon/type';
import {specialtyIdMap} from '@/const/game/pokemon';
import {defaultNeutralOpts} from '@/const/game/production';
import {imageSmallIconSizes} from '@/styles/image';
import {BerryDataMap} from '@/types/game/berry';
import {EffectiveBonus} from '@/types/game/bonus';
import {getCarryLimitFromPokemonInfo} from '@/utils/game/producing/carryLimit';
import {generatePossibleIngredientProductions} from '@/utils/game/producing/ingredientChain';
import {getPokemonProducingParams, getPokemonProducingRate} from '@/utils/game/producing/pokemon';
import {getDailyEnergyOfRate} from '@/utils/game/producing/rate';


type Props = PokemonBerryStatsCommonProps & {
  level: number,
  bonus: EffectiveBonus,
  berryDataMap: BerryDataMap,
};

export const PokemonIconsBerryStats = ({
  pokemonProducingParamsMap,
  pokemonOfBerry,
  level,
  bonus,
  berryDataMap,
  ...props
}: Props) => {
  const t = useTranslations('Game');

  return (
    <PokemonIconsItemStats
      targetSpecialty={specialtyIdMap.berry}
      getProducingStats={(pokemon, chain) => {
        return [...generatePossibleIngredientProductions({level, chain})]
          .map((ingredients) => {
            const pokemonRate = getPokemonProducingRate({
              level,
              pokemon,
              pokemonProducingParams: getPokemonProducingParams({
                pokemonId: pokemon.id,
                pokemonProducingParamsMap,
              }),
              snorlaxFavorite: {},
              ...defaultNeutralOpts,
              bonus,
              berryData: berryDataMap[pokemon.berry.id],
              ingredients,
              carryLimit: getCarryLimitFromPokemonInfo({pokemon}),
              ...props,
            });

            return {
              rate: pokemonRate.berry,
              identifier: ingredients.map(({id}) => id).join('-'),
              ingredients,
              dailyTotalEnergy: getDailyEnergyOfRate(pokemonRate),
            };
          });
      }}
      getIcon={({berry}) => (
        <NextImage
          src={`/images/berry/${berry.id}.png`}
          alt={t(`Berry.${berry.id}`)}
          sizes={imageSmallIconSizes}
        />
      )}
      {...props}
    />
  );
};
