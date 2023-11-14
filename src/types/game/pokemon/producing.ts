import {PokemonId} from '@/types/game/pokemon';


export type PokemonProducingItem<TId> = {
  id: TId,
  qty: number,
};

export type PokemonProducingParamsType = 'ingredient' | 'skill';

export type PokemonProducingParamsError = {[key in PokemonProducingParamsType]: number | null};

export type PokemonProducingParams = {
  pokemonId: PokemonId,
  dataCount: number,
  ingredientSplit: number,
  skillValue: number,
  skillPercent: number | null,
  error: PokemonProducingParamsError,
};

export type PokemonProducingParamsMap = {[pokemonId in PokemonId]?: PokemonProducingParams};

export type PokemonProducingParamsMeta = {
  dataCount: number,
  lastUpdated: number,
};
