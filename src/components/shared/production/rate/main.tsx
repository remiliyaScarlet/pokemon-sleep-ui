import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {ProducingRateContent} from '@/components/shared/production/rate/content';
import {ProducingRateContentCommonProps} from '@/components/shared/production/rate/type';
import {ProducingRate} from '@/types/game/producing/rate';


type Props = ProducingRateContentCommonProps & {
  rate: ProducingRate | null,
};

export const ProducingRateUI = ({rate, getIcon, ...props}: Props) => {
  return (
    <Flex direction="row" noFullWidth className="gap-1">
      <ProducingRateContent dailyRate={rate?.quantity} getIcon={getIcon} {...props}/>
      <ProducingRateContent dailyRate={rate?.dailyEnergy} isEnergy {...props}/>
    </Flex>
  );
};
