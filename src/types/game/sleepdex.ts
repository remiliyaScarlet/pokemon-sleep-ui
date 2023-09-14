import {PokemonId} from '@/types/game/pokemon';
import {SleepMapId, SleepStyleId} from '@/types/game/sleepStyle';


export type SleepdexStyleId = `${PokemonId}-${SleepStyleId}`;

export type SleepdexMap = {[id in SleepdexStyleId]?: true};

export type SleepdexData = {
  pokemonId: PokemonId,
  mapId: SleepMapId,
  styleId: SleepStyleId,
};
