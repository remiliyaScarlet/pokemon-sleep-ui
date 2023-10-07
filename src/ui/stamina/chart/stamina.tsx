import React from 'react';

import {StaminaChart} from '@/ui/stamina/chart/common';
import {StaminaChartTooltipOfStamina} from '@/ui/stamina/chart/tooltip/stamina';
import {StaminaChartCommonProps} from '@/ui/stamina/chart/type';
import {generateStaminaTicks} from '@/ui/stamina/utils';


export const StaminaChartOfStamina = ({config, logs}: StaminaChartCommonProps) => {
  const start = config.sleepSession.primary.end;

  return (
    <StaminaChart
      config={config}
      logs={logs}
      titleI18nId="Chart.Stamina"
      getData={({stamina}) => stamina}
      domainMin={0}
      tooltip={<StaminaChartTooltipOfStamina logs={logs} start={start}/>}
      dataTicks={generateStaminaTicks(Math.max(...logs.map(({stamina}) => stamina)))}
    />
  );
};
