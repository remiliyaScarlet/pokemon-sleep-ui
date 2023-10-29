import {IngredientId} from '@/types/game/ingredient';


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

export type MealCounter = {[meal in MealId]?: number | null};
