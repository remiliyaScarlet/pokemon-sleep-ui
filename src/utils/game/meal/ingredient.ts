import {uniqBy} from 'lodash';

import {IngredientCounter, IngredientOfMeals} from '@/types/game/ingredient';
import {MealIngredientInfo} from '@/types/game/meal/info';
import {Meal, MealCounter} from '@/types/game/meal/main';


type GetMealsIngredientsRequiredOpts = {
  meals: Meal[],
  mealCount: MealCounter,
};

export const getMealIngredientInfo = ({
  meals,
  mealCount,
}: GetMealsIngredientsRequiredOpts): MealIngredientInfo => {
  const ingredientsRequired: IngredientCounter = {};
  const ingredientOfMeals: IngredientOfMeals = {};

  for (const {id: mealId, ingredients} of uniqBy(meals, ({id}) => id)) {
    const count = mealCount[mealId];

    if (!count) {
      continue;
    }

    for (const {id: ingredientId, quantity} of ingredients) {
      const totalQuantity = quantity * count;
      const ingredientOfMeal = ingredientOfMeals[ingredientId] ?? {};

      ingredientsRequired[ingredientId] = (ingredientsRequired[ingredientId] ?? 0) + totalQuantity;
      ingredientOfMeals[ingredientId] = {
        ...ingredientOfMeal,
        [mealId]: (ingredientOfMeal[mealId] ?? 0) + totalQuantity,
      };
    }
  }

  return {
    ingredientsRequired,
    ingredientOfMeals,
  };
};
