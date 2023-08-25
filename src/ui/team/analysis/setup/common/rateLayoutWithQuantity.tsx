import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex';
import {ProducingRate} from '@/types/game/producing/rate';
import {TeamAnalysisRateLayout, TeamAnalysisRateLayoutProps} from '@/ui/team/analysis/setup/common/rateLayout';
import {TeamAnalysisRateLayoutCommonProps} from '@/ui/team/analysis/setup/common/type';


type Props = Pick<TeamAnalysisRateLayoutProps, 'icon'> & TeamAnalysisRateLayoutCommonProps & {
  rate: ProducingRate | null,
};

export const TeamAnalysisRateLayoutWithQuantity = ({rate, icon, highlight, period}: Props) => {
  return (
    <Flex direction="col" className={clsx('p-1', highlight && 'bg-blink')}>
      <TeamAnalysisRateLayout period={period} showQuantity rate={rate} icon={icon}/>
    </Flex>
  );
};
