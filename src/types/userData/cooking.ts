import {FilterInclusionMap} from '@/components/input/filter/type';
import {IngredientId} from '@/types/game/ingredient';
import {MealTypeId} from '@/types/game/meal';
import {CookingFilterIngredientCount, CookingFilterRecipeLevel} from '@/ui/cooking/type';


export type UserCookingPreset = {
  mealType: MealTypeId | null,
  potCapacity: number,
  ingredients: FilterInclusionMap<IngredientId>,
  showEnergy: boolean,
  showUnmakeableRecipe: boolean,
  ingredientCount: CookingFilterIngredientCount,
  recipeLevel: CookingFilterRecipeLevel,
};
