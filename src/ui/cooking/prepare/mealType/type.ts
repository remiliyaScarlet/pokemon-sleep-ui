import {IngredientCounter} from '@/types/game/ingredient';
import {MealId} from '@/types/game/meal/main';


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
};
