import {UserCookingPreset} from '@/types/userData/cooking';
import {NonNullableRecord} from '@/utils/type';


export const defaultCookingPreset: NonNullableRecord<UserCookingPreset> = {
  mealType: 1,
  target: {
    1: {
      breakfast: 1005,
      lunch: 1005,
      dinner: 1005,
    },
    2: {
      breakfast: 2011,
      lunch: 2011,
      dinner: 2011,
    },
    3: {
      breakfast: 3007,
      lunch: 3007,
      dinner: 3007,
    },
  },
  potCapacity: 15,
  ingredients: {},
  showEnergy: true,
  showUnmakeableRecipe: true,
  ingredientCount: {},
  recipeLevel: {},
  mealsWanted: {},
  mealsMarked: {},
};
