import {FilterInclusionMap} from '@/components/input/filter/type';
import {IngredientId} from '@/types/game/ingredient';
import {MealTypeId} from '@/types/game/meal/main';
import {CookingIngredientCount, CookingFilterRecipeLevel} from '@/ui/cooking/type';


export type UserCookingPreset = {
  mealType: MealTypeId | null,
  potCapacity: number,
  ingredients: FilterInclusionMap<IngredientId>,
  showEnergy: boolean,
  showUnmakeableRecipe: boolean,
  ingredientCount: CookingIngredientCount,
  recipeLevel: CookingFilterRecipeLevel,
};
