import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {GenericIcon} from '@/components/shared/icon/main';
import {defaultStaminaCalcConfig} from '@/const/user/settings';
import {UserSettingsSection} from '@/ui/base/navbar/userSettings/sections/base';
import {UserSettingsSleepSession} from '@/ui/base/navbar/userSettings/sections/energy/session';
import {UserSettingsSkillRecovery} from '@/ui/base/navbar/userSettings/sections/energy/skillRecovery';
import {UserSettingsEnergyProps} from '@/ui/base/navbar/userSettings/sections/energy/type';
import {getStaminaEfficiency} from '@/utils/game/stamina/main';


export const UserSettingsEnergy = (props: UserSettingsEnergyProps) => {
  const {config, setConfig} = props;
  const {sleepSession} = config;

  const t = useTranslations('UI.Stamina');

  return (
    <UserSettingsSection titleIcon={
      <GenericIcon src="/images/generic/mood.png" noWrap alt={t('Title')}/>
    }>
      <Flex direction="col" className="items-center gap-1.5 lg:flex-row">
        <Flex direction="col" className="gap-1.5">
          <UserSettingsSleepSession {...props} session="primary" num={1}/>
          <UserSettingsSleepSession
            {...props}
            session="secondary"
            num={2}
            isActive={!!sleepSession.secondary}
            onClick={() => setConfig({
              ...config,
              sleepSession: {
                ...sleepSession,
                secondary: sleepSession.secondary ? undefined : defaultStaminaCalcConfig.sleepSession.secondary,
              },
            })}
          />
        </Flex>
        <UserSettingsSkillRecovery {...props}/>
      </Flex>
      <Flex direction="col" noFullWidth className="w-fit self-end rounded-lg border border-slate-500 px-2 py-1">
        {getStaminaEfficiency({config}).toFixed(4)}x
      </Flex>
    </UserSettingsSection>
  );
};
