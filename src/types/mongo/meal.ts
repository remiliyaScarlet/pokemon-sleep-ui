import {PokemonIngredientId} from '@/types/mongo/pokemon';


export type MealId = number;

export type MealTypeId = number;

export type MealIngredient = {
  id: PokemonIngredientId,
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
