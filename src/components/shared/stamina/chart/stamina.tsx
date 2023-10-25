import React from 'react';

import {StaminaChart} from '@/components/shared/stamina/chart/common';
import {StaminaChartTooltipOfStamina} from '@/components/shared/stamina/chart/tooltip/stamina';
import {StaminaChartCommonProps} from '@/components/shared/stamina/chart/type';
import {generateStaminaTicks} from '@/components/shared/stamina/chart/utils';


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
