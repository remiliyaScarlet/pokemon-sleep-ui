import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {ProducingRate} from '@/types/game/producing/rate';
import {TeamAnalysisRateLayout, TeamAnalysisRateLayoutProps} from '@/ui/team/analysis/setup/common/rateLayout';
import {TeamAnalysisRateLayoutCommonProps} from '@/ui/team/analysis/setup/common/type';


type Props = Pick<TeamAnalysisRateLayoutProps, 'icon'> & TeamAnalysisRateLayoutCommonProps & {
  rate: ProducingRate | null,
};

export const TeamAnalysisRateLayoutWithQuantity = ({rate, icon, period}: Props) => {
  return (
    <Flex noFullWidth className="px-1 py-0.5 text-sm">
      <TeamAnalysisRateLayout period={period} showQuantity rate={rate} icon={icon}/>
    </Flex>
  );
};
