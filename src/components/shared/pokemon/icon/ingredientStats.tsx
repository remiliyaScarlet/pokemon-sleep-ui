import React from 'react';

import {useTranslations} from 'next-intl';

import {NextImage} from '@/components/shared/common/image/main';
import {PokemonIconsItemStats} from '@/components/shared/pokemon/icon/itemStats';
import {PokemonIngredientStatsCommonProps} from '@/components/shared/pokemon/icon/type';
import {specialtyIdMap} from '@/const/game/pokemon';
import {defaultNeutralOpts} from '@/const/game/production';
import {imageSmallIconSizes} from '@/styles/image';
import {EffectiveBonus} from '@/types/game/bonus';
import {Ingredient} from '@/types/game/ingredient';
import {getCarryLimitFromPokemonInfo} from '@/utils/game/producing/carryLimit';
import {generatePossibleIngredientProductions} from '@/utils/game/producing/ingredientChain';
import {getPokemonProducingParams, getPokemonProducingRate} from '@/utils/game/producing/pokemon';
import {getDailyEnergyOfRate} from '@/utils/game/producing/rate';


type Props = PokemonIngredientStatsCommonProps & {
  level: number,
  ingredient: Ingredient | undefined,
  bonus: EffectiveBonus,
};

export const PokemonIconsIngredientStats = ({
  pokemonProducingParamsMap,
  berryDataMap,
  level,
  ingredient,
  bonus,
  ...props
}: Props) => {
  const t = useTranslations('Game');

  if (!ingredient) {
    return <></>;
  }

  return (
    <PokemonIconsItemStats
      targetSpecialty={specialtyIdMap.ingredient}
      getProducingStats={(pokemon, chain) => {
        if (!ingredient) {
          return [];
        }

        return [...generatePossibleIngredientProductions({level, chain})]
          .filter((ingredients) => ingredients.some(({id}) => id === ingredient.id))
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
              rate: pokemonRate.ingredient[ingredient.id],
              identifier: ingredients.map(({id}) => id).join('-'),
              ingredients,
              dailyTotalEnergy: getDailyEnergyOfRate(pokemonRate),
            };
          });
      }}
      getIcon={() => (
        <NextImage
          src={`/images/ingredient/${ingredient.id}.png`}
          alt={t(`Food.${ingredient.id}`)}
          sizes={imageSmallIconSizes}
        />
      )}
      {...props}
    />
  );
};
