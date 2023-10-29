import {UserCookingPreset} from '@/types/userData/cooking';
import {NonNullableRecord} from '@/utils/type';


export const defaultCookingPreset: NonNullableRecord<UserCookingPreset> = {
  mealType: 1,
  potCapacity: 15,
  ingredients: {},
  showEnergy: true,
  showUnmakeableRecipe: true,
  ingredientCount: {},
  recipeLevel: {},
  mealsWanted: {},
};
