import {staminaDepleteInterval} from '@/const/game/stamina';
import {StaminaAtEvent, StaminaEventLog, StaminaEventLogFlattened} from '@/types/game/stamina/event';
import {getEfficiency} from '@/utils/game/stamina/efficiency';


type ToFlattenedStaminaEventLogOpts = {
  log: StaminaEventLog,
  key: keyof StaminaAtEvent,
};

const toFlattenedStaminaEventLog = ({log, key}: ToFlattenedStaminaEventLogOpts): StaminaEventLogFlattened => {
  const {staminaUnderlying} = log;
  const stamina = log.stamina[key];

  return {
    ...log,
    stamina,
    staminaUnderlying: staminaUnderlying[key],
    efficiency: getEfficiency({stamina}),
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

export const getStaminaEventLogsFlattened = (logs: StaminaEventLog[]): StaminaEventLogFlattened[] => {
  const originalFlattened = logs.flatMap(expandStaminaEventLog);
  const flattened: StaminaEventLogFlattened[] = [originalFlattened[0]];

  for (let i = 1; i < originalFlattened.length; i++) {
    const curr = originalFlattened[i];
    let last = flattened.at(-1);

    while (last) {
      let newLog: StaminaEventLogFlattened | undefined = undefined;

      if (curr.staminaUnderlying - last.staminaUnderlying < -1) {
        const stamina = Math.max(0, last.stamina - 1);

        newLog = {
          type: null,
          timing: last.timing + staminaDepleteInterval,
          stamina,
          staminaUnderlying: last.staminaUnderlying - 1,
          efficiency: getEfficiency({stamina}),
        };
      } else if (curr.staminaUnderlying - last.staminaUnderlying > 1 && curr.type === 'wakeup') {
        const prev = originalFlattened[i - 1];
        const recoveryInterval = (curr.timing - prev.timing) / (curr.stamina - prev.stamina);

        newLog = {
          // `type` can't be `null` as the efficiency will be incorrect
          type: 'sleep',
          timing: last.timing + recoveryInterval,
          stamina: last.stamina + 1,
          staminaUnderlying: last.staminaUnderlying + 1,
          efficiency: getEfficiency({stamina: curr.stamina}),
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
