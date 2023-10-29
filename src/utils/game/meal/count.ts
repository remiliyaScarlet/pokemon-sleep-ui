import {IngredientCounter} from '@/types/game/ingredient';
import {Meal, MealCounter} from '@/types/game/meal/main';
import {toSum} from '@/utils/array';


export const getMealIngredientCount = (meal: Meal): number => (
  toSum(meal.ingredients.map(({quantity}) => quantity))
);

type GetMealsIngredientsRequiredOpts = {
  meals: Meal[],
  mealCount: MealCounter,
};

export const getMealsIngredientsRequired = ({
  meals,
  mealCount,
}: GetMealsIngredientsRequiredOpts): IngredientCounter => {
  const counter: IngredientCounter = {};

  for (const {id, ingredients} of meals) {
    const count = mealCount[id];

    if (!count) {
      continue;
    }

    for (const {id, quantity} of ingredients) {
      counter[id] = (counter[id] ?? 0) + quantity * count;
    }
  }

  return counter;
};
