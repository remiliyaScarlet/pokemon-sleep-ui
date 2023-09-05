import React from 'react';

import {InputBox} from '@/components/input/box';
import {SleepSessions, SleepSessionTimes} from '@/types/game/sleep';
import {UserSettingsEnergyProps} from '@/ui/base/navbar/userSettings/sections/energy/type';
import {toSeconds, toTimeString} from '@/utils/time';


type Props = UserSettingsEnergyProps & {
  session: keyof SleepSessions<never>,
  times: SleepSessionTimes | undefined,
  timing: keyof SleepSessionTimes,
};

export const UserSettingsSleepSessionTime = ({config, setConfig, session, times, timing}: Props) => {
  return (
    <InputBox
      type="time"
      disabled={!times}
      value={times ? toTimeString(times[timing]) : ''}
      onChange={({target}) => setConfig({
        ...config,
        sleepSession: {
          ...config.sleepSession,
          [session]: {
            ...times,
            [timing]: toSeconds(target.value),
          },
        },
      })}
    />
  );
};
