import {durationOfDay} from '@/const/common';
import {staminaRecoveryInterval} from '@/const/game/stamina';
import {StaminaSleepSessionConfig} from '@/types/game/producing/stamina';
import {SleepSessionInfo, SleepSessionInternal, SleepSessionTimes} from '@/types/game/sleep';
import {rotateTime} from '@/utils/time';


export const getSleepSessionExtraInfo = (session: SleepSessionTimes): Omit<SleepSessionInternal, 'adjustedTiming'> => {
  const {start, end} = session;
  const length = end - start + (end > start ? 0 : durationOfDay);

  return {
    length,
    recovery: Math.ceil(length / staminaRecoveryInterval),
  };
};

const getSecondarySleepSessionInfo = ({primary, secondary}: StaminaSleepSessionConfig) => {
  if (!secondary) {
    return null;
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

export const getSleepSessionInfo = (session: StaminaSleepSessionConfig): SleepSessionInfo => {
  const {primary} = session;

  const primaryWithInfo: SleepSessionInternal = {
    ...getSleepSessionExtraInfo(primary),
    adjustedTiming: {
      start: rotateTime(primary.start - primary.end),
      end: 0,
    },
  };
  const secondaryWithInfo: SleepSessionInternal | null = getSecondarySleepSessionInfo(session);

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

export const getSleepDurationsFromSleepSession = ({
  primary,
  secondary,
}: StaminaSleepSessionConfig): number[] => {
  const sleepDurations = [rotateTime(primary.end - primary.start)];

  if (secondary) {
    sleepDurations.push(rotateTime(secondary.end - secondary.start));
  }

  return sleepDurations;
};
