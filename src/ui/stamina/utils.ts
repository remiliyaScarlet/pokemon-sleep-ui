import {staminaDepleteInterval, staminaRecoveryInterval} from '@/const/game/stamina';
import {StaminaAtEvent, StaminaEventLog} from '@/types/game/producing/stamina';
import {StaminaEventLogFlattened} from '@/ui/stamina/type';
import {formatSeconds, rotateTime} from '@/utils/time';


type GetStaminaOfLogOpts = {
  log: StaminaEventLog,
  key: keyof StaminaAtEvent,
};

const toFlattenedStaminaEventLog = ({log, key}: GetStaminaOfLogOpts): StaminaEventLogFlattened => {
  const {stamina, staminaUnderlying} = log;

  return {
    ...log,
    stamina: stamina[key],
    staminaUnderlying: staminaUnderlying[key],
  };
};

const expandStaminaEventLog = (log: StaminaEventLog): StaminaEventLogFlattened[] => {
  const {type} = log;

  if (type === 'sleep') {
    return [toFlattenedStaminaEventLog({log, key: 'before'})];
  }

  if (type === 'wakeup') {
    return [toFlattenedStaminaEventLog({log, key: 'after'})];
  }

  if (type === 'efficiencyBlock') {
    return [toFlattenedStaminaEventLog({log, key: 'before'})];
  }

  if (type === 'skillRecovery') {
    return [
      toFlattenedStaminaEventLog({log, key: 'before'}),
      toFlattenedStaminaEventLog({log, key: 'after'}),
    ];
  }

  throw new Error(`Failed to flatten the stamina event log of type [${type satisfies never}]`);
};


export const toFlattenedStaminaEventLogs = (logs: StaminaEventLog[]): StaminaEventLogFlattened[] => {
  const originalFlattened = logs.flatMap(expandStaminaEventLog);
  const flattened: StaminaEventLogFlattened[] = [originalFlattened[0]];

  for (let i = 1; i < originalFlattened.length; i++) {
    const curr = originalFlattened[i];
    let last = flattened.at(-1);

    while (last) {
      let newLog: StaminaEventLogFlattened | undefined = undefined;

      if (curr.staminaUnderlying - last.staminaUnderlying < -1) {
        newLog = {
          type: null,
          timing: last.timing + staminaDepleteInterval,
          stamina: Math.max(0, last.stamina - 1),
          staminaUnderlying: last.staminaUnderlying - 1,
        };
      } else if (curr.staminaUnderlying - last.staminaUnderlying > 1 && curr.type === 'wakeup') {
        newLog = {
          // `type` can't be `null` as the efficiency will be incorrect
          type: 'sleep',
          timing: last.timing + staminaRecoveryInterval,
          stamina: last.stamina + 1,
          staminaUnderlying: last.staminaUnderlying + 1,
        };
      }

      if (newLog) {
        flattened.push(newLog);
      }

      last = newLog;
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
