import {staminaDepleteInterval} from '@/const/game/stamina';
import {StaminaEventLog} from '@/types/game/producing/stamina';
import {StaminaEventLogFlattened} from '@/ui/stamina/type';
import {formatSeconds, rotateTime} from '@/utils/time';


const expandStaminaEventLog = (log: StaminaEventLog): StaminaEventLogFlattened[] => {
  const {type, stamina} = log;

  if (type === 'sleep') {
    return [{...log, stamina: stamina.before}];
  }

  if (type === 'wakeup') {
    return [{...log, stamina: stamina.after}];
  }

  if (type === 'efficiencyBlock') {
    return [{...log, stamina: stamina.before}];
  }

  if (type === 'skillRecovery') {
    return [{...log, stamina: stamina.before}, {...log, stamina: stamina.after}];
  }

  throw new Error(`Failed to flatten the stamina event log of type [${type satisfies never}]`);
};


export const toFlattenedStaminaEventLogs = (logs: StaminaEventLog[]): StaminaEventLogFlattened[] => {
  const originalFlattened = logs.flatMap(expandStaminaEventLog);
  const flattened: StaminaEventLogFlattened[] = [originalFlattened[0]];

  for (let i = 1; i < originalFlattened.length; i++) {
    const curr = originalFlattened[i];
    let last = flattened.at(-1);

    while (last && last.stamina - curr.stamina > 1) {
      flattened.push({
        type: null,
        timing: last.timing + staminaDepleteInterval,
        stamina: last.stamina - 1,
      });

      last = flattened.at(-1);
    }
    flattened.push(curr);
  }

  return flattened;
};

type GenerateTicksOpts = {
  max: number,
  interval: number,
};

export const generateTicks = ({max, interval}: GenerateTicksOpts): number[] => {
  let current = 0;
  const ticks: number[] = [current];

  while (current < max) {
    current += interval;
    ticks.push(current);
  }

  return ticks;
};

type GenerateTimingTicksOpts = {
  max: number,
  isLandscape: boolean,
};

export const generateTimingTicks = ({max, isLandscape}: GenerateTimingTicksOpts): number[] => generateTicks({
  max,
  // 4/8 is (the number of the ticks to show - 1)
  interval: Math.ceil(max / (isLandscape ? 8 : 4) / 1800) * 1800,
});

export const generateStaminaTicks = (max: number): number[] => generateTicks({max, interval: 20});

type ToFormattedTimeFromTimingOpts = {
  start: number,
  timing: number,
};

export const toFormattedTimeFromTiming = ({start, timing}: ToFormattedTimeFromTimingOpts): string => {
  return formatSeconds({
    seconds: rotateTime(start + timing),
    omitSeconds: true,
  });
};
