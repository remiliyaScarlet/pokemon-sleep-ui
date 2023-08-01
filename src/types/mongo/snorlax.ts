import {SnorlaxRank} from '@/types/game/rank';
import {SleepMapId} from '@/types/mongo/sleepStyle';


export type SnorlaxRankData = {
  rank: SnorlaxRank,
  energy: number
};

export type SnorlaxRankInMap = {
  mapId: SleepMapId,
  data: SnorlaxRankData[],
};

export type SnorlaxRankMap = {[mapId in SleepMapId]: SnorlaxRankInMap};

export type SnorlaxReward = {
  rank: SnorlaxRank,
  shard: number,
};
