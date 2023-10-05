import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {ProducingRateContent} from '@/components/shared/production/rate/content';
import {ProducingRateContentCommonProps} from '@/components/shared/production/rate/type';
import {ProducingRate} from '@/types/game/producing/rate';
import {Dimension} from '@/types/style';


type Props = ProducingRateContentCommonProps & {
  rate: ProducingRate | null,
} & ({
  hideQuantity: true,
  getIcon?: never,
} | {
  hideQuantity?: false,
  getIcon: (dimension: Dimension) => React.ReactNode,
});

export const ProducingRateUI = ({rate, hideQuantity, ...props}: Props) => {
  return (
    <Flex direction="row" noFullWidth className="gap-1">
      {!hideQuantity && <ProducingRateContent dailyRate={rate?.quantity} {...props}/>}
      <ProducingRateContent dailyRate={rate?.dailyEnergy} isEnergy {...props}/>
    </Flex>
  );
};
