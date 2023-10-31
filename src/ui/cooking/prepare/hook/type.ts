import {IngredientCounter} from '@/types/game/ingredient';
import {Meal, MealId, MealTypeId} from '@/types/game/meal/main';


export type MealPreparerMealTypeStats = {
  recipeOnly: number,
  withFiller: number,
};

export type MealPreparerInfoOfMealType = {
  ingredients: {
    missing: IngredientCounter,
    filler: IngredientCounter,
    required: IngredientCounter,
  },
  finalStrength: {[meal in MealId]?: number},
  stats: MealPreparerMealTypeStats,
  mealsOfType: Meal[],
};

export type MealPreparerInfo = {[mealType in MealTypeId]: MealPreparerInfoOfMealType};
