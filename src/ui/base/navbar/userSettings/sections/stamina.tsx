import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericIcon} from '@/components/shared/icon/common/main';
import {StaminaConfig} from '@/components/shared/stamina/input/main';
import {StaminaConfigProps} from '@/components/shared/stamina/input/type';
import {UserSettingsSection} from '@/ui/base/navbar/userSettings/sections/base';
import {getSleepSessionInfo} from '@/utils/game/sleep';
import {getStaminaEfficiency} from '@/utils/game/stamina/main';


export const UserSettingsStamina = (props: StaminaConfigProps) => {
  const {config} = props;
  const {sleepSession} = config;

  const t = useTranslations('UI.Stamina');

  const sessionInfo = getSleepSessionInfo(sleepSession);

  return (
    <UserSettingsSection titleIcon={
      <GenericIcon src="/images/generic/mood.png" noWrap alt={t('Title')}/>
    }>
      <StaminaConfig {...props}/>
      <Flex noFullWidth className="w-fit self-end rounded-lg border border-slate-500 px-2 py-1">
        {getStaminaEfficiency({config, sessionInfo}).toFixed(4)}x
      </Flex>
    </UserSettingsSection>
  );
};
