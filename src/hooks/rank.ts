import React from 'react';

import {SnorlaxRankFinalEstimate} from '@/types/game/rank';
import {getSnorlaxRankFinalEstimate, GetSnorlaxRankFinalEstimateOpts} from '@/utils/game/rank';


export const useSnorlaxRankFinalEstimate = (opts: GetSnorlaxRankFinalEstimateOpts): SnorlaxRankFinalEstimate[] => {
  const {energy} = opts;

  return React.useMemo(() => getSnorlaxRankFinalEstimate(opts), [energy]);
};
