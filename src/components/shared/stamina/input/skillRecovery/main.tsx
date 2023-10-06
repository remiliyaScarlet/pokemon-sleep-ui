import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/text';
import {Flex} from '@/components/layout/flex/common';
import {GenericIcon} from '@/components/shared/icon/common/main';
import {StaminaConfigSkillRecoveryInput} from '@/components/shared/stamina/input/skillRecovery/input';
import {StaminaConfigProps} from '@/components/shared/stamina/input/type';
import {staminaCalcStrategyI18nId} from '@/const/game/stamina';
import {staminaCalcSkillRecoveryStrategies} from '@/types/game/producing/stamina';


export const StaminaConfigSkillRecovery = (props: StaminaConfigProps) => {
  const {config, setConfig} = props;
  const {skillRecovery} = config;
  const t = useTranslations('UI.Stamina');

  return (
    <Flex center className="gap-1.5">
      <FilterTextInput
        title={
          <Flex direction="row" className="w-10">
            <GenericIcon alt={t('Title')} src="/images/generic/mainSkill.png" dimension="h-7 w-7"/>
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
        ids={staminaCalcSkillRecoveryStrategies}
        idToButton={(strategy) => t(`Strategy.${staminaCalcStrategyI18nId[strategy]}`)}
        idToItemId={(strategy) => strategy}
        noFixedTitleWidth
      />
      <Flex direction="row" className="justify-center gap-1.5">
        <StaminaConfigSkillRecoveryInput
          {...props}
          id="energyAmount"
          iconI18nId="Amount"
          iconSrc="/images/mainSkill/target/team.png"
          configTarget="amount"
        />
        <StaminaConfigSkillRecoveryInput
          {...props}
          id="energySkillDailyCount"
          iconI18nId="DailyCount"
          iconSrc="/images/generic/flash.png"
          configTarget="dailyCount"
        />
      </Flex>
    </Flex>
  );
};
