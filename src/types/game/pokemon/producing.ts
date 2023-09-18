import {PokemonId} from '@/types/game/pokemon';


export type PokemonProducingParams = {
  pokemonId: PokemonId,
  ingredientSplit: number,
};

export type PokemonProducingParamsMap = {[pokemonId in PokemonId]?: PokemonProducingParams};
