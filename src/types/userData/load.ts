import {PokemonId} from '@/types/game/pokemon';


export type UserDataLoadingOpts = {
  type: 'teamAnalysis',
  opts?: never,
} | {
  type: 'pokebox',
  opts?: never,
} | {
  type: 'pokeboxSorted',
  opts?: never,
} | {
  type: 'sleepdex',
  opts?: never,
} | {
  type: 'sleepdexOfPokemon',
  opts: {
    pokemonId: PokemonId,
  },
};
