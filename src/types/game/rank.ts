import {SleepMapId} from '@/types/game/sleepStyle';
import {SnorlaxRankData} from '@/types/game/snorlax';


export type SnorlaxRankTitleId = number;

export type SnorlaxRank = {
  title: SnorlaxRankTitleId,
  number: number
};

export type SnorlaxRankFinalEstimate = {
  mapId: SleepMapId,
  rank: SnorlaxRankData | undefined,
};
