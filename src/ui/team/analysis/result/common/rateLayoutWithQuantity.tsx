import React from 'react';

import {Flex} from '@/components/layout/flex';
import {ProductionRate} from '@/types/game/pokemon';
import {TeamAnalysisRateLayout, TeamAnalysisRateLayoutProps} from '@/ui/team/analysis/result/common/rateLayout';


type Props = Pick<TeamAnalysisRateLayoutProps, 'icon'> & {
  rate: ProductionRate | null,
};

export const TeamAnalysisRateLayoutWithQuantity = ({rate, icon}: Props) => {
  return (
    <Flex direction="col">
      <TeamAnalysisRateLayout dailyRate={rate?.quantity ?? null} isEnergy={false} icon={icon}/>
      <TeamAnalysisRateLayout dailyRate={rate?.dailyEnergy ?? null} isEnergy/>
    </Flex>
  );
};
