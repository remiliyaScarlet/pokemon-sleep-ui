import {StaminaEventLog} from '@/types/game/producing/stamina';
import {getStaminaAfterDuration} from '@/utils/game/stamina/depletion';


type GenerateSleepEventFromLastOpts = {
  newLogs: StaminaEventLog[],
  sleepLog: StaminaEventLog,
};

export const generateSleepEventFromLast = ({newLogs, sleepLog}: GenerateSleepEventFromLastOpts): StaminaEventLog => {
  const last = newLogs[newLogs.length - 1];
  const sleepTiming = sleepLog.timing;

  const stamina = getStaminaAfterDuration({
    start: last.stamina.after,
    duration: sleepTiming - last.timing,
  });

  return {
    type: 'sleep',
    timing: sleepTiming,
    stamina: {before: stamina, after: stamina},
  };
};

type OffsetEventLogStaminaOpts = {
  log: StaminaEventLog,
  offset: number,
};

export const offsetEventLogStamina = ({log, offset}: OffsetEventLogStaminaOpts): StaminaEventLog => {
  const {before, after} = log.stamina;

  return {
    ...log,
    stamina: {
      before: before + offset,
      after: after + offset,
    },
  };
};
