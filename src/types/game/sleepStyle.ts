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

export type SleepStyleNormal = {
  pokemonId: PokemonId,
  mapId: SleepMapId,
  styles: SleepStyle[],
};

export type SleepStyleNormalFlattened = {
  pokemonId: PokemonId,
  mapId: SleepMapId,
  style: SleepStyle,
};

export type SleepStyleNormalMap = {[id in PokemonId]?: SleepStyleNormal[]};

export type FieldToSleepStyleFlattenedMap = {[id in SleepMapId]?: SleepStyleNormalFlattened[]};

export type SleepStyleSpecial = {
  pokemonId: PokemonId,
  style: SleepStyleId,
  rewards: SleepReward,
  unreleased: boolean,
};

export type SleepStyleSpecialMap = {[id in PokemonId]?: SleepStyleSpecial[]};
