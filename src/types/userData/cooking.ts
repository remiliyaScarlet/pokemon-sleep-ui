import {FilterInclusionMap} from '@/components/input/filter/type';
import {RecipeLevel} from '@/types/game/cooking';
import {IngredientCounter, IngredientId} from '@/types/game/ingredient';
import {MealCounter, MealId, MealsMarked, MealTypeId} from '@/types/game/meal/main';


export const userCookingMeals = [
  'breakfast',
  'lunch',
  'dinner',
] as const;

export type UserCookingMeal = typeof userCookingMeals[number];

export type UserCookingTargetOfType = {[meal in UserCookingMeal]?: MealId | null};

export type UserCookingTarget = {[mealType in MealTypeId]?: UserCookingTargetOfType};

export type UserCookingPreset = {
  mealType: MealTypeId | null,
  target: UserCookingTarget,
  potCapacity: number,
  ingredients: FilterInclusionMap<IngredientId>,
  showEnergy: boolean,
  showUnmakeableRecipe: boolean,
  ingredientCount: IngredientCounter,
  recipeLevel: RecipeLevel,
  mealsWanted: MealCounter,
  mealsMarked: MealsMarked,
};
