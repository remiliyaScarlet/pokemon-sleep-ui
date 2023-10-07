'use client';
import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {StaminaEfficiencyUI} from '@/components/shared/stamina/efficiency/main';
import {StaminaConfig} from '@/components/shared/stamina/input/main';
import {StaminaCalcConfig} from '@/types/game/producing/stamina';
import {StaminaChartOfEfficiency} from '@/ui/stamina/chart/efficiency';
import {StaminaChartOfStamina} from '@/ui/stamina/chart/stamina';
import {toFlattenedStaminaEventLogs} from '@/ui/stamina/utils';
import {getSleepSessionInfo} from '@/utils/game/sleep';
import {getStaminaEfficiency} from '@/utils/game/stamina/main';


type Props = {
  preloadedStaminaConfig: StaminaCalcConfig,
};

export const StaminaAnalysisClient = ({preloadedStaminaConfig}: Props) => {
  const [config, setConfig] = React.useState<StaminaCalcConfig>(preloadedStaminaConfig);
  const {sleepSession} = config;

  const sessionInfo = React.useMemo(
    () => getSleepSessionInfo(sleepSession),
    [sleepSession],
  );

  const staminaEfficiency = getStaminaEfficiency({config, sessionInfo});
  const logs = toFlattenedStaminaEventLogs(staminaEfficiency.logs);

  return (
    <Flex className="gap-3 p-2">
      <AdsUnit/>
      <StaminaConfig config={config} setConfig={setConfig} idPrefix="staminaAnalysis"/>
      <HorizontalSplitter/>
      <StaminaChartOfStamina config={config} logs={logs} titleI18nId="Chart.Stamina"/>
      <StaminaChartOfEfficiency config={config} logs={logs} titleI18nId="Chart.Efficiency"/>
      <StaminaEfficiencyUI efficiency={staminaEfficiency}/>
    </Flex>
  );
};
