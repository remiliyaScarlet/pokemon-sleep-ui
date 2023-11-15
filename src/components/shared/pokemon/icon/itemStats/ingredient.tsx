import React from 'react';

import {useTranslations} from 'next-intl';

import {PokemonIconsItemStatsFromPokedex} from '@/components/shared/pokemon/icon/itemStats/base/fromPokedex';
import {PokemonIngredientStatsCommonProps} from '@/components/shared/pokemon/icon/itemStats/type';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {specialtyIdMap} from '@/const/game/pokemon';
import {Ingredient} from '@/types/game/ingredient';


type Props = PokemonIngredientStatsCommonProps & {
  level: number,
  ingredient: Ingredient | undefined,
};

export const PokemonIconsIngredientStats = ({
  ingredient,
  ...props
}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex.Info');

  if (!ingredient) {
    return null;
  }

  return (
    <PokemonIconsItemStatsFromPokedex
      targetSpecialty={specialtyIdMap.ingredient}
      getItemRate={(pokemonRate) => pokemonRate.ingredient[ingredient.id]}
      getIcon={(_, dimension) => (
        <PokemonIngredientIcon id={ingredient.id} dimension={dimension}/>
      )}
      itemAlt={t('Ingredient')}
      itemImageSrc={`/images/ingredient/${ingredient.id}.png`}
      isProductionIncluded={(productions) => productions.some(({id}) => id === ingredient.id)}
      {...props}
    />
  );
};
