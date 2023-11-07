import {PokemonId} from '@/types/game/pokemon';


export type PokemonBranchData = {
  pokemonId: PokemonId,
  branches: PokemonId[],
};

export type PokemonBranchMap = {[id in PokemonId]?: PokemonBranchData};
