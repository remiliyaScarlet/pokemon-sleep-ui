import {PokemonId} from '@/types/game/pokemon';
import {SnorlaxRank} from '@/types/game/rank';


export type SleepMapId = number;

export type SleepStyleId = number | 'onSnorlax';

export type SleepReward = {
  exp: number,
  shards: number,
  candy: number,
};

export type SleepStyle = {
  style: SleepStyleId,
  rank: SnorlaxRank,
  rewards: SleepReward,
};

export type SleepStyleOfMap = {
  pokemonId: PokemonId,
  mapId: SleepMapId,
  styles: SleepStyle[],
};

export type SleepStyleDataFlattened = {
  pokemonId: PokemonId,
  mapId: SleepMapId,
  style: SleepStyle,
};

export type PokemonSleepDataMap = {[id in PokemonId]?: SleepStyleOfMap[]};

export type FieldToSleepStyleFlattenedMap = {[id in SleepMapId]?: SleepStyleDataFlattened[]};
