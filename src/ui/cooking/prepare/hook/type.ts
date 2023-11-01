import {Meal, MealId, MealTypeId} from '@/types/game/meal/main';
import {MealPreparerIngredientStats} from '@/ui/cooking/prepare/type';


export type MealPreparerMealTypeSummary = {
  recipeOnly: number,
  withFiller: number,
};

export type MealPreparerInfoOfMealType = {
  ingredients: MealPreparerIngredientStats,
  finalStrength: {[meal in MealId]?: number},
  summary: MealPreparerMealTypeSummary,
  mealsOfType: Meal[],
};

export type MealPreparerInfo = {[mealType in MealTypeId]: MealPreparerInfoOfMealType};
