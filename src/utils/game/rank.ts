import {SnorlaxRankFinalEstimate} from '@/types/game/rank';
import {SnorlaxDataOfMap} from '@/types/game/snorlax';
import {getSnorlaxRankAtEnergy} from '@/utils/game/snorlax';


export type GetSnorlaxRankFinalEstimateOpts = {
  energy: number,
  snorlaxData: SnorlaxDataOfMap[],
};

export const getSnorlaxRankFinalEstimate = ({
  energy,
  snorlaxData,
}: GetSnorlaxRankFinalEstimateOpts) => snorlaxData.map(({mapId, data}): SnorlaxRankFinalEstimate => ({
  mapId,
  rank: getSnorlaxRankAtEnergy({energy, data}),
}));
