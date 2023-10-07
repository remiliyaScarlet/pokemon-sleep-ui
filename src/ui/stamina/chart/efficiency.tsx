import React from 'react';

import {StaminaChart} from '@/ui/stamina/chart/common';
import {StaminaChartTooltipOfEfficiency} from '@/ui/stamina/chart/tooltip/efficiency';
import {StaminaChartCommonProps} from '@/ui/stamina/chart/type';
import {getEfficiency} from '@/utils/game/stamina/efficiency';


export const StaminaChartOfEfficiency = ({config, logs}: StaminaChartCommonProps) => {
  const start = config.sleepSession.primary.end;

  return (
    <StaminaChart
      config={config}
      logs={logs}
      titleI18nId="Chart.Efficiency"
      getData={({stamina}) => getEfficiency(stamina)}
      domainMin={1}
      tooltip={<StaminaChartTooltipOfEfficiency logs={logs} start={start}/>}
    />
  );
};
