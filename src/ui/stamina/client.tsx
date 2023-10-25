'use client';
import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonNatureSelector} from '@/components/shared/pokemon/nature/selector/main';
import {PokemonSubSkillSelector} from '@/components/shared/pokemon/subSkill/selector/main';
import {StaminaEfficiencyUI} from '@/components/shared/stamina/efficiency/main';
import {StaminaConfig} from '@/components/shared/stamina/input/main';
import {StaminaChartOfEfficiency} from '@/ui/stamina/chart/efficiency';
import {StaminaChartOfStamina} from '@/ui/stamina/chart/stamina';
import {useStaminaAnalysis} from '@/ui/stamina/hook';
import {StaminaAnalysisDataProps} from '@/ui/stamina/type';
import {getStaminaEventLogsFlattened} from '@/ui/stamina/utils';
import {getSleepSessionInfo} from '@/utils/game/sleep';
import {getStaminaEfficiency} from '@/utils/game/stamina/main';


export const StaminaAnalysisClient = (props: StaminaAnalysisDataProps) => {
  const {subSkillMap} = props;

  const {state, setConfig, setSkillTrigger, setNature, setSubSkill} = useStaminaAnalysis(props);
  const {config, skillTrigger, subSkill, nature} = state;
  const {sleepSession} = config;

  const sessionInfo = React.useMemo(
    () => getSleepSessionInfo(sleepSession),
    [sleepSession],
  );

  const staminaEfficiency = getStaminaEfficiency({
    config,
    sessionInfo,
    skillTriggers: [skillTrigger],
  });
  const logs = getStaminaEventLogsFlattened(staminaEfficiency.logs);

  return (
    <Flex className="gap-3 p-2">
      <AdsUnit/>
      <StaminaConfig
        idPrefix="staminaAnalysis"
        config={config}
        setConfig={setConfig}
        trigger={skillTrigger}
        setTrigger={setSkillTrigger}
      />
      <Flex className="gap-1.5 md:flex-row">
        <PokemonSubSkillSelector
          classNameForHeight="h-8"
          subSkill={subSkill}
          setSubSkill={setSubSkill}
          subSkillMap={subSkillMap}
        />
        <PokemonNatureSelector
          classNameForHeight="h-8"
          nature={nature}
          setNature={setNature}
        />
      </Flex>
      <HorizontalSplitter/>
      <StaminaEfficiencyUI efficiency={staminaEfficiency}/>
      <StaminaChartOfStamina config={config} logs={logs}/>
      <StaminaChartOfEfficiency config={config} logs={logs}/>
    </Flex>
  );
};
