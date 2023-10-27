import React from 'react';

import {IngredientIcons} from '@/components/shared/meal/ingredients/icons';
import {IngredientIconsCommonProps} from '@/components/shared/meal/ingredients/type';
import {Meal} from '@/types/game/meal/main';


type Props = IngredientIconsCommonProps & {
  meal: Meal,
};

export const IngredientIconsFromMeal = ({meal, ...props}: Props) => {
  return (
    <IngredientIcons
      ingredients={meal.ingredients.map(({id, quantity}) => ({id, qty: quantity}))}
      {...props}
    />
  );
};
