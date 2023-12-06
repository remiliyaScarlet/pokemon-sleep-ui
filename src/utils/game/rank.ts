import {SnorlaxRankFinalEstimate} from '@/types/game/rank';
import {SnorlaxRankInMap} from '@/types/game/snorlax';
import {getSnorlaxRankAtEnergy} from '@/utils/game/snorlax';


export type GetSnorlaxRankFinalEstimateOpts = {
  energy: number,
  snorlaxRankData: SnorlaxRankInMap[],
};

export const getSnorlaxRankFinalEstimate = ({
  energy,
  snorlaxRankData,
}: GetSnorlaxRankFinalEstimateOpts) => snorlaxRankData.map(({mapId, data}): SnorlaxRankFinalEstimate => ({
  mapId,
  rank: getSnorlaxRankAtEnergy({energy, data}),
}));
