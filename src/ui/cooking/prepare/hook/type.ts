import {Meal, MealId, MealTypeId} from '@/types/game/meal/main';
import {MealPreparerIngredientStats} from '@/ui/cooking/prepare/type';


export type MealPreparerMealTypeStats = {
  recipeOnly: number,
  withFiller: number,
};

export type MealPreparerInfoOfMealType = {
  ingredients: MealPreparerIngredientStats,
  finalStrength: {[meal in MealId]?: number},
  stats: MealPreparerMealTypeStats,
  mealsOfType: Meal[],
};

export type MealPreparerInfo = {[mealType in MealTypeId]: MealPreparerInfoOfMealType};
