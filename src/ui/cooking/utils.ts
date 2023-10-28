import {defaultCookingPreset} from '@/const/user/cooking';
import {MealIngredient} from '@/types/game/meal/main';
import {UserCookingPreset} from '@/types/userData/cooking';
import {CookingFilter, CookingIngredientCount, CookingPreloadedData} from '@/ui/cooking/type';
import {isNotNullish} from '@/utils/type';


type ToCookingPresetOpts = {
  preloaded: CookingPreloadedData['cooking'],
  filter: CookingFilter,
};

export const toCookingPreset = ({preloaded, filter}: ToCookingPresetOpts): UserCookingPreset => {
  return {
    ...defaultCookingPreset,
    ...preloaded,
    potCapacity: filter.capacity,
    mealType: filter.type,
    ingredients: filter.ingredient,
    ingredientCount: filter.ingredientCount,
    recipeLevel: filter.recipeLevel,
    showUnmakeableRecipe: filter.showUnmakeableRecipe,
  };
};

export const toMealIngredientFromCookingCount = (ingredientCount: CookingIngredientCount): MealIngredient[] => {
  return Object.entries(ingredientCount)
    .map(([id, quantity]) => {
      if (!quantity) {
        return null;
      }

      return {id: parseInt(id), quantity};
    })
    .filter(isNotNullish);
};

export const toCookingCountFromMealIngredient = (ingredients: MealIngredient[]): CookingIngredientCount => (
  Object.fromEntries(ingredients.map(({id, quantity}) => [id, quantity]))
);

export const subtractIngredientCount = (
  minuend: CookingIngredientCount,
  subtrahend: CookingIngredientCount,
): CookingIngredientCount => (
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
