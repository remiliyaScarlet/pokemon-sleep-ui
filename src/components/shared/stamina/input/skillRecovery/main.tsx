import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/text';
import {Flex} from '@/components/layout/flex/common';
import {GenericMainSkillIcon} from '@/components/shared/pokemon/mainSkill/icon/generic';
import {StaminaConfigSkillRecoveryInput} from '@/components/shared/stamina/input/skillRecovery/input';
import {StaminaConfigProps} from '@/components/shared/stamina/input/type';
import {staminaStrategyI18nId} from '@/const/game/stamina';
import {staminaSkillRecoveryStrategies} from '@/types/game/producing/stamina';


export const StaminaConfigSkillRecovery = (props: StaminaConfigProps) => {
  const {config, setConfig, idPrefix} = props;
  const {skillRecovery} = config;
  const t = useTranslations('UI.Stamina');

  return (
    <Flex center className="gap-1.5">
      <FilterTextInput
        title={
          <Flex direction="row" className="w-10">
            <GenericMainSkillIcon alt={t('Title')} dimension="h-7 w-7"/>
          </Flex>
        }
        onClick={(strategy) => setConfig({
          ...config,
          skillRecovery: {
            ...config.skillRecovery,
            strategy,
          },
        })}
        isActive={(strategy) => strategy === skillRecovery.strategy}
        ids={staminaSkillRecoveryStrategies}
        idToButton={(strategy) => t(`Strategy.${staminaStrategyI18nId[strategy]}`)}
        idToItemId={(strategy) => `${idPrefix}-staminaStrategy-${strategy}`}
        noFixedTitleWidth
      />
      <Flex direction="row" className="justify-center gap-1.5">
        <StaminaConfigSkillRecoveryInput
          {...props}
          id={`${idPrefix}-energyAmount`}
          iconI18nId="Amount"
          iconSrc="/images/mainSkill/target/team.png"
          configTarget="amount"
        />
        <StaminaConfigSkillRecoveryInput
          {...props}
          id={`${idPrefix}-energySkillDailyCount`}
          iconI18nId="DailyCount"
          iconSrc="/images/generic/flash.png"
          configTarget="dailyCount"
        />
      </Flex>
    </Flex>
  );
};
