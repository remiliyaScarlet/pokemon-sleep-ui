import {PokemonId} from '@/types/game/pokemon';
import {SleepMapId, SleepStyleId} from '@/types/game/sleepStyle';


export type SleepdexMarkedByMapId = `${PokemonId}-${SleepStyleId}`;

export type SleepdexMarkedByMap = {[id in SleepdexMarkedByMapId]?: true};

export type SleepdexMarkedByPokemonId = `${SleepMapId}-${SleepStyleId}`;

export type SleepdexMarkedByPokemon = {[id in SleepdexMarkedByPokemonId]?: true};

export type SleepdexData = {
  pokemonId: PokemonId,
  mapId: SleepMapId,
  styleId: SleepStyleId,
};
