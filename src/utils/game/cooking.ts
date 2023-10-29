import {IngredientCounter} from '@/types/game/ingredient';
import {MealIngredient} from '@/types/game/meal/main';
import {isNotNullish} from '@/utils/type';


export const toMealIngredientFromCookingCount = (ingredientCount: IngredientCounter): MealIngredient[] => {
  return Object.entries(ingredientCount)
    .map(([id, quantity]) => {
      if (!quantity) {
        return null;
      }

      return {id: parseInt(id), quantity};
    })
    .filter(isNotNullish);
};

export const toCookingCountFromMealIngredient = (ingredients: MealIngredient[]): IngredientCounter => (
  Object.fromEntries(ingredients.map(({id, quantity}) => [id, quantity]))
);

export const subtractIngredientCount = (
  minuend: IngredientCounter,
  subtrahend: IngredientCounter,
): IngredientCounter => (
  Object.fromEntries(Object.entries(minuend).map(([id, count]) => {
    if (!count) {
      return null;
    }

    const result = count - (subtrahend[parseInt(id)] ?? 0);

    if (result < 0) {
      return null;
    }

    return [id, result];
  }).filter(isNotNullish))
);
