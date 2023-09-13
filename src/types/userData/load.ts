import {PokemonId} from '@/types/game/pokemon';
import {SleepMapId} from '@/types/game/sleepStyle';


export type UserDataLoadingOpts = {
  type: 'teamAnalysisSetup',
  opts?: never,
} | {
  type: 'pokebox',
  opts?: never,
} | {
  type: 'pokeboxSorted',
  opts?: never,
} | {
  type: 'sleepdexByMap',
  opts: {
    mapId: SleepMapId,
  },
} | {
  type: 'sleepdexByPokemon',
  opts: {
    pokemonId: PokemonId,
  },
};
