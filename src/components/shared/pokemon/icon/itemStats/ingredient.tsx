import React from 'react';

import {PokemonIconsItemStats} from '@/components/shared/pokemon/icon/itemStats/item';
import {PokemonIngredientStatsCommonProps} from '@/components/shared/pokemon/icon/itemStats/type';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {specialtyIdMap} from '@/const/game/pokemon';
import {EffectiveBonus} from '@/types/game/bonus';
import {Ingredient} from '@/types/game/ingredient';


type Props = PokemonIngredientStatsCommonProps & {
  level: number,
  bonus: EffectiveBonus,
  ingredient: Ingredient | undefined,
};

export const PokemonIconsIngredientStats = ({
  ingredient,
  ...props
}: Props) => {
  if (!ingredient) {
    return null;
  }

  return (
    <PokemonIconsItemStats
      targetSpecialty={specialtyIdMap.ingredient}
      getItemRate={(pokemonRate) => pokemonRate.ingredient[ingredient.id]}
      getIcon={(_, dimension) => (
        <PokemonIngredientIcon id={ingredient.id} dimension={dimension}/>
      )}
      isProductionIncluded={(productions) => productions.some(({id}) => id === ingredient.id)}
      {...props}
    />
  );
};
