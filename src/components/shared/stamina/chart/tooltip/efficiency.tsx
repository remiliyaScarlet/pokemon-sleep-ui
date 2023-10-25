import React from 'react';

import {StaminaChartTooltip} from '@/components/shared/stamina/chart/tooltip/common';
import {StaminaChartTooltipCommonProps} from '@/components/shared/stamina/chart/tooltip/type';


export const StaminaChartTooltipOfEfficiency = (props: StaminaChartTooltipCommonProps) => {
  return (
    <StaminaChartTooltip
      {...props}
      getInfo={(efficiency) => `${efficiency}x`}
    />
  );
};
