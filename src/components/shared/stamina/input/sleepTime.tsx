import React from 'react';

import {InputBox} from '@/components/input/box';
import {StaminaConfigProps} from '@/components/shared/stamina/input/type';
import {SleepSessions, SleepSessionTimes} from '@/types/game/sleep';
import {toSeconds, toTimeString} from '@/utils/time';


type Props = StaminaConfigProps & {
  session: keyof SleepSessions<never>,
  times: SleepSessionTimes | null,
  timing: keyof SleepSessionTimes,
};

export const StaminaConfigSleepTime = ({config, setConfig, session, times, timing}: Props) => {
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
