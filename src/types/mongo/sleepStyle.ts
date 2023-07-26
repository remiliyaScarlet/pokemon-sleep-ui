import {SnorlaxRank} from '@/types/game/rank';
import {PokemonId} from '@/types/mongo/pokemon';


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

export type PokemonSleepDataMap = {[id in PokemonId]?: SleepStyleData[]};
