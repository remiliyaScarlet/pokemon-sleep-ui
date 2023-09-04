import {durationOfDay} from '@/const/common';
import {maxSleepDuration} from '@/const/game/stamina';
import {StaminaCalcSleepSessionConfig} from '@/types/game/producing/stamina';
import {SleepSessionInfo, SleepSessionInternal, SleepSessionTimes} from '@/types/game/sleep';
import {rotateTime} from '@/utils/time';


export const getSleepSessionExtraInfo = (session: SleepSessionTimes): Omit<SleepSessionInternal, 'adjustedTiming'> => {
  const {start, end} = session;
  const length = end - start + (end > start ? 0 : durationOfDay);

  return {
    length,
    recovery: Math.ceil(length / (maxSleepDuration / 100)),
  };
};

const getSecondarySleepSessionInfo = ({primary, secondary}: StaminaCalcSleepSessionConfig) => {
  if (!secondary) {
    return undefined;
  }

  const extra = getSleepSessionExtraInfo(secondary);
  const start = rotateTime(secondary.start - primary.end);

  return {
    ...extra,
    adjustedTiming: {
      start,
      end: start + extra.length,
    },
  };
};

export const getSleepSessionInfo = (session: StaminaCalcSleepSessionConfig): SleepSessionInfo => {
  const {primary} = session;

  const primaryWithInfo: SleepSessionInternal = {
    ...getSleepSessionExtraInfo(primary),
    adjustedTiming: {
      start: rotateTime(primary.start - primary.end),
      end: 0,
    },
  };
  const secondaryWithInfo: SleepSessionInternal | undefined = getSecondarySleepSessionInfo(session);

  const awakeDuration = durationOfDay - primaryWithInfo.length - (secondaryWithInfo?.length ?? 0);

  return {
    session: {
      primary: primaryWithInfo,
      secondary: secondaryWithInfo,
    },
    duration: {
      awake: awakeDuration,
    },
  };
};
