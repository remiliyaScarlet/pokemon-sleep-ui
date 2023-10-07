import React from 'react';

import {StaminaChartTooltip} from '@/ui/stamina/chart/tooltip/common';
import {StaminaChartTooltipCommonProps} from '@/ui/stamina/chart/tooltip/type';


export const StaminaChartTooltipOfEfficiency = (props: StaminaChartTooltipCommonProps) => {
  return (
    <StaminaChartTooltip
      {...props}
      getInfo={(efficiency) => `${efficiency}x`}
    />
  );
};
