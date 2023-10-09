import {StaminaEventLog} from '@/types/game/producing/stamina';
import {getStaminaAfterDuration} from '@/utils/game/stamina/depletion';
import {GetLogsCommonOpts} from '@/utils/game/stamina/events/type';
import {generateSleepEventFromLast} from '@/utils/game/stamina/events/utils';


export const getLogsWithSecondarySleep = ({sessionInfo, logs}: GetLogsCommonOpts): StaminaEventLog[] => {
  const {session} = sessionInfo;
  const {secondary} = session;

  if (!secondary) {
    return [...logs];
  }

  const newLogs: StaminaEventLog[] = [logs[0]];

  const sleepStamina = getStaminaAfterDuration({
    start: newLogs[0].stamina.after,
    duration: secondary.adjustedTiming.start,
  });

  newLogs.push(
    {
      type: 'sleep',
      timing: secondary.adjustedTiming.start,
      stamina: {
        before: sleepStamina.inGame,
        after: sleepStamina.inGame + secondary.recovery,
      },
      staminaUnderlying: {
        before: sleepStamina.actual,
        after: sleepStamina.actual + secondary.recovery,
      },
    },
    {
      type: 'wakeup',
      timing: secondary.adjustedTiming.end,
      stamina: {
        before: sleepStamina.inGame,
        after: sleepStamina.inGame + secondary.recovery,
      },
      staminaUnderlying: {
        before: sleepStamina.actual,
        after: sleepStamina.actual + secondary.recovery,
      },
    },
  );

  newLogs.push(generateSleepEventFromLast({newLogs, sleepLog: logs[logs.length - 1]}));

  return newLogs;
};
