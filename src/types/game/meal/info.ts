import {IngredientCounter, IngredientOfMeals} from '@/types/game/ingredient';


export type MealStrengthInfo = {
  strengthBase: number,
  strengthAfterRarity: number,
  strengthFinal: number,
  bonusRate: number,
};

export type MealBonusInfo = {
  level: number,
  rarity: number,
  total: number,
};

export type MealIngredientInfo = {
  ingredientsRequired: IngredientCounter,
  ingredientOfMeals: IngredientOfMeals,
};
