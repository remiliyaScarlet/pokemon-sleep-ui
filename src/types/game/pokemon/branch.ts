import {PokemonId} from '@/types/game/pokemon';


export type PokemonBranchData = {
  pokemonId: PokemonId,
  branches: PokemonId[],
};

export type PokemonBranchMapByLeaf = {[branchedPokemonId in PokemonId]?: PokemonBranchData};
