import React from 'react';

import {IngredientCounter, IngredientId} from '@/types/game/ingredient';
import {Meal} from '@/types/game/meal/main';
import {PokemonProducingItem} from '@/types/game/pokemon/producing';
import {MealMakerRecipeInfo} from '@/ui/cooking/make/recipe/type';


export type UseRecipeInfoOpts = {
  meal: Meal,
  ingredientCount: IngredientCounter,
};

export const useRecipeInfo = ({meal, ingredientCount}: UseRecipeInfoOpts): MealMakerRecipeInfo => {
  return React.useMemo(() => {
    const ingredientSetReady = Object.fromEntries(meal.ingredients.map(({id, quantity}) => {
      const filterIngredientCount = ingredientCount[id];

      if (filterIngredientCount == null) {
        return [id, 0];
      }

      return [id, filterIngredientCount / quantity];
    }));
    const ingredientsMissing = meal.ingredients
      .map(({id, quantity}): PokemonProducingItem<IngredientId> => {
        const filterIngredientCount = ingredientCount[id];

        if (filterIngredientCount == null) {
          return {id, qty: 0};
        }

        return {id, qty: filterIngredientCount - quantity};
      })
      .filter(({qty}) => qty < 0);

    const isMealMakeable = Object.values(ingredientSetReady).every((set) => set >= 1);

    const mealsReady = Math.min(...(meal.ingredients.length ? Object.values(ingredientSetReady) : [0]));

    return {
      ingredientSetReady,
      ingredientsMissing,
      isMealMakeable,
      mealsReady,
    };
  }, [meal, ingredientCount]);
};
