import {IngredientId} from '@/types/game/ingredient';


export const mealRarityBonusBreakPoints = [
  40,
  30,
  20,
  10,
  1,
] as const;

export type MealRarityBonusBreakPoint = typeof mealRarityBonusBreakPoints[number];

export type MealId = number;

export type MealTypeId = number;

export type MealIngredient = {
  id: IngredientId,
  quantity: number,
};

export type Meal = {
  id: MealId,
  type: MealTypeId,
  ingredients: MealIngredient[],
};

export type MealStrengthInfo = {
  strengthBase: number,
  strengthFinal: number,
  bonusRate: number,
};
