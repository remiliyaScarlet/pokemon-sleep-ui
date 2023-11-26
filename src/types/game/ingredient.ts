import {MealId} from '@/types/game/meal/main';


export type IngredientId = number;

export type Ingredient = {
  id: IngredientId,
  price: number,
  energy: number,
};

export type IngredientMap = {[id in IngredientId]?: Ingredient};

export type IngredientCounter = {[ingredient in IngredientId]?: number | null};

export type IngredientOfMeals = {[ingredient in IngredientId]?: {[meal in MealId]?: number}};
