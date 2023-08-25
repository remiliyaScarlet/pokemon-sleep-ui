import {IngredientId} from '@/types/game/ingredient';


export type IngredientProduction = {
  id: IngredientId,
  qty: number,
};

export type IngredientProductionAtLevels = {[level in IngredientLevel]: IngredientProduction};

export const ingredientLevels = [
  1,
  30,
  60,
] as const;

export type IngredientLevel = typeof ingredientLevels[number];

export type IngredientChainId = number;

export type IngredientProductionAtLevel = IngredientProduction & {
  level: number,
};

export type IngredientPossibilities = {[level in IngredientLevel]: IngredientProduction[]};

export type IngredientChain = {
  chainId: IngredientChainId,
  ingredients: IngredientPossibilities,
};

export type IngredientChainMap = {[chainId in IngredientChainId]: IngredientChain};
