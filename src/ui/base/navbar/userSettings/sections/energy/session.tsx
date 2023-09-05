import React from 'react';

import ArrowRightCircleIcon from '@heroicons/react/24/outline/ArrowRightCircleIcon';
import ArrowRightIcon from '@heroicons/react/24/outline/ArrowRightIcon';
import MinusCircleIcon from '@heroicons/react/24/outline/MinusCircleIcon';
import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {getToggleButtonClass} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex';
import {GenericIcon} from '@/components/shared/icon/main';
import {SleepSessions} from '@/types/game/sleep';
import {UserSettingsSleepSessionTime} from '@/ui/base/navbar/userSettings/sections/energy/sessionTime';
import {UserSettingsEnergyProps} from '@/ui/base/navbar/userSettings/sections/energy/type';


type Props = UserSettingsEnergyProps & {
  session: keyof SleepSessions<never>,
  num: number,
} & ({
  onClick?: never,
  isActive?: never,
} | {
  onClick: () => void,
  isActive: boolean,
});

export const UserSettingsSleepSession = (props: Props) => {
  const {
    config,
    session,
    num,
    onClick,
    isActive,
  } = props;
  const {sleepSession} = config;
  const t = useTranslations('UI.Stamina');

  const times = sleepSession[session];
  const active = onClick ? isActive : true;

  return (
    <Flex direction="row" className="items-center justify-center gap-1.5 lg:justify-start">
      <button disabled={!onClick} onClick={onClick} className={clsx(
        'group flex flex-row rounded-full px-2 py-1',
        onClick ? getToggleButtonClass(active) : 'button-toggle-active-bg',
      )}>
        <div className="relative h-6 w-6">
          {onClick ?
            (active ? <PlusCircleIcon/> : <MinusCircleIcon/>) :
            <ArrowRightCircleIcon/>}
        </div>
        <div className="relative h-6 w-6">
          <GenericIcon
            src="/images/generic/sleep.png"
            noWrap
            noInvert
            alt={t('SleepSession')}
            className={active ? 'invert-on-dark' : 'invert-on-light'}
          />
        </div>
        <div>
          {num}
        </div>
      </button>
      <UserSettingsSleepSessionTime {...props} times={times} timing="start"/>
      <div className="relative h-6 w-6">
        <ArrowRightIcon/>
      </div>
      <UserSettingsSleepSessionTime {...props} times={times} timing="end"/>
    </Flex>
  );
};
