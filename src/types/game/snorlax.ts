import {FilterInclusionMap} from '@/components/input/filter/type';
import {BerryId} from '@/types/game/berry';
import {SnorlaxRank} from '@/types/game/rank';
import {SleepMapId} from '@/types/game/sleepStyle';


export type SnorlaxFavorite = FilterInclusionMap<BerryId>;

export type FilterWithSnorlaxFavorite = Record<string, SnorlaxFavorite>;

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
