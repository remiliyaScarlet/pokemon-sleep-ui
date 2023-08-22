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

export type SleepStyleData = {
  pokemonId: PokemonId,
  mapId: SleepMapId,
  styles: SleepStyle[],
};

export type SleepStyleDataFlattened = {
  pokemonId: PokemonId,
  mapId: SleepMapId,
  style: SleepStyle,
};

export type PokemonSleepDataMap = {[id in PokemonId]?: SleepStyleData[]};

export type FieldSleepDataMap = {[id in SleepMapId]?: SleepStyleData[]};

export type FieldToSleepStyleFlattenedMap = {[id in SleepMapId]?: SleepStyleDataFlattened[]};
