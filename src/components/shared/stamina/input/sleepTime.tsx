import React from 'react';

import {InputBox} from '@/components/input/box';
import {Slider} from '@/components/input/slider';
import {Flex} from '@/components/layout/flex/common';
import {StaminaConfigProps} from '@/components/shared/stamina/input/type';
import {durationOfDay} from '@/const/common';
import {SleepSessions, SleepSessionTimes} from '@/types/game/sleep';
import {toSeconds, toTimeString} from '@/utils/time';


type Props = Pick<StaminaConfigProps, 'config' | 'setConfig'> & {
  session: keyof SleepSessions<never>,
  times: SleepSessionTimes | null,
  timing: keyof SleepSessionTimes,
  icon?: React.ReactNode,
};

export const StaminaConfigSleepTime = ({config, setConfig, session, times, timing, icon}: Props) => {
  const timeValue = times ? times[timing] : null;

  const updateTimeInConfig = (time: number) => setConfig({
    ...config,
    sleepSession: {
      ...config.sleepSession,
      [session]: {
        ...times,
        [timing]: time,
      },
    },
  });

  return (
    <Flex direction="row" className="items-center gap-1">
      {icon}
      <Flex className="gap-1">
        <InputBox
          type="time"
          disabled={!times}
          value={timeValue !== null ? toTimeString(timeValue) : ''}
          onChange={({target}) => updateTimeInConfig(toSeconds(target.value))}
          className="text-center"
        />
        <Slider
          value={timeValue ?? 0}
          setValue={updateTimeInConfig}
          min={0}
          max={durationOfDay - 1}
        />
      </Flex>
    </Flex>
  );
};
