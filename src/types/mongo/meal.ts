import {IngredientId} from '@/types/mongo/ingredient';


export type MealId = number;

export type MealTypeId = number;

export type MealIngredient = {
  id: IngredientId,
  quantity: number,
};

export type MealLevel = {
  lv: number,
  exp: number,
  energy: number,
};

export type Meal = {
  id: MealId,
  type: MealTypeId,
  ingredients: MealIngredient[],
  levels: MealLevel[]
};
