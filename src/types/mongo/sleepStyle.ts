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
  pokemonId: PokemonId,
  mapId: SleepMapId,
  rank: SnorlaxRank,
  style: SleepStyleId,
  rewards: SleepReward,
};

export type PokemonSleepStyleMap = {[id in PokemonId]?: SleepStyle[]};
