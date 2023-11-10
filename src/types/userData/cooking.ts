import {FilterInclusionMap} from '@/components/input/filter/type';
import {RecipeLevel} from '@/types/game/cooking';
import {IngredientCounter, IngredientId} from '@/types/game/ingredient';
import {MealCounter, MealsMarked, MealTypeId} from '@/types/game/meal/main';


export type UserCookingPreset = {
  mealType: MealTypeId | null,
  potCapacity: number,
  ingredients: FilterInclusionMap<IngredientId>,
  showEnergy: boolean,
  showUnmakeableRecipe: boolean,
  ingredientCount: IngredientCounter,
  recipeLevel: RecipeLevel,
  mealsWanted: MealCounter,
  mealsMarked: MealsMarked,
};
