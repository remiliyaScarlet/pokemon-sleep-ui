import {PokemonId} from '@/types/mongo/pokemon';


export const ingredientLevel = [
  1,
  30,
  60,
] as const;

export type IngredientLevel = typeof ingredientLevel[number];

export type IngredientChainId = number;

export type IngredientChainData = {
  id: PokemonId,
  qty: number,
};

export type IngredientPossibilities = {[level in IngredientLevel]: IngredientChainData[]};

export type IngredientChain = {
  chainId: IngredientChainId,
  ingredients: IngredientPossibilities,
};
