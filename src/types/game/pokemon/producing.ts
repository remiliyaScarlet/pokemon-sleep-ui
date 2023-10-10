import {PokemonId} from '@/types/game/pokemon';


export type PokemonProducingItem<TId> = {
  id: TId,
  qty: number,
};

export type PokemonProducingParamsType = 'ingredient' | 'skill';

export const pokemonProducingParamsConfidenceLevel = [
  2, // Very Good
  1, // Good
  0, // Decent
  -1, // Poor
  -2, // Very Poor
];

export type PokemonProducingParamsConfidenceLevel = typeof pokemonProducingParamsConfidenceLevel[number];

export type PokemonProducingParamsConfidence = {
  [key in PokemonProducingParamsType]: PokemonProducingParamsConfidenceLevel | null
};

export type PokemonProducingParams = {
  pokemonId: PokemonId,
  dataCount: number,
  ingredientSplit: number,
  skillValue: number,
  confidence: PokemonProducingParamsConfidence,
};

export type PokemonProducingParamsMap = {[pokemonId in PokemonId]?: PokemonProducingParams};
