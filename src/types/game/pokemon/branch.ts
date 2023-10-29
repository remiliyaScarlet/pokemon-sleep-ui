import {PokemonId} from '@/types/game/pokemon';


export type PokemonBranchData = {
  pokemonId: PokemonId,
  branches: PokemonId[],
};
