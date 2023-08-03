import React from 'react';

import {Flex} from '@/components/layout/flex';
import {ProducingRate} from '@/types/game/producing/rate';
import {TeamAnalysisRateLayout, TeamAnalysisRateLayoutProps} from '@/ui/team/analysis/result/common/rateLayout';
import {TeamAnalysisRateLayoutCommonProps} from '@/ui/team/analysis/result/common/type';
import {classNames} from '@/utils/react';


type Props = Pick<TeamAnalysisRateLayoutProps, 'icon'> & TeamAnalysisRateLayoutCommonProps & {
  rate: ProducingRate | null,
};

export const TeamAnalysisRateLayoutWithQuantity = ({rate, icon, highlight}: Props) => {
  return (
    <Flex direction="col" className={classNames('p-1', highlight ? 'bg-blink' : '')}>
      <TeamAnalysisRateLayout dailyRate={rate?.quantity ?? null} isEnergy={false} icon={icon}/>
      <TeamAnalysisRateLayout dailyRate={rate?.dailyEnergy ?? null} isEnergy/>
    </Flex>
  );
};
