import {StaminaCalcSkillRecoveryConfig, StaminaEventLog} from '@/types/game/producing/stamina';
import {SleepSessionInfo} from '@/types/game/sleep';
import {getStaminaAfterDuration} from '@/utils/game/stamina/depletion';
import {GetLogsCommonOpts} from '@/utils/game/stamina/events/type';
import {offsetEventLogStamina, updateLogStaminaFromLast} from '@/utils/game/stamina/events/utils';


type GetSkillRecoveryTimingsOpts = {
  skillRecovery: StaminaCalcSkillRecoveryConfig,
  secondarySession: SleepSessionInfo['session']['secondary'],
  awakeDuration: number,
};

export const getSkillRecoveryTimings = ({
  skillRecovery,
  secondarySession,
  awakeDuration,
}: GetSkillRecoveryTimingsOpts): number[] => {
  const {dailyCount} = skillRecovery;

  return [...new Array(dailyCount).keys()].map((idx) => {
    let expectedTiming = awakeDuration * (idx + 1) / (dailyCount + 1);

    if (secondarySession && expectedTiming >= secondarySession.adjustedTiming.start) {
      expectedTiming += secondarySession.length;
    }

    return expectedTiming;
  });
};

type GetLogsWithSkillRecoveryOpts = GetLogsCommonOpts & {
  skillRecovery: StaminaCalcSkillRecoveryConfig,
};

export const getLogsWithSkillRecovery = ({
  sessionInfo,
  skillRecovery,
  logs,
}: GetLogsWithSkillRecoveryOpts): StaminaEventLog[] => {
  const {strategy, dailyCount, amount} = skillRecovery;

  if (strategy !== 'conservative' || dailyCount === 0 || amount === 0) {
    return [...logs];
  }

  const {session, duration} = sessionInfo;
  const {secondary} = session;

  const newLogs: StaminaEventLog[] = [logs[0]];
  const skillTimings = getSkillRecoveryTimings({
    skillRecovery,
    secondarySession: secondary,
    awakeDuration: duration.awake,
  });
  let skillUsedCount = 0;

  for (const log of logs.slice(1)) {
    let skillTimingHead = skillTimings[skillUsedCount];

    while (log.timing >= skillTimingHead) {
      const latest = newLogs[newLogs.length - 1];
      const staminaBefore = getStaminaAfterDuration({
        start: latest.stamina.after,
        duration: skillTimingHead - latest.timing,
      });

      newLogs.push({
        type: 'skillRecovery',
        timing: skillTimingHead,
        stamina: {
          before: staminaBefore.inGame,
          after: staminaBefore.inGame + amount,
        },
        staminaUnderlying: {
          before: staminaBefore.inGame,
          after: staminaBefore.inGame + amount,
        },
      });
      skillUsedCount += 1;
      skillTimingHead = skillTimings[skillUsedCount];
    }

    // Using indexer to guarantee the last log is returned
    // This shouldn't fail because `newLogs` already have something inside at the beginning
    const lastLog = newLogs[newLogs.length - 1];

    if (!skillUsedCount || lastLog.type !== 'skillRecovery') {
      newLogs.push(offsetEventLogStamina({log, offset: skillUsedCount * amount}));
      continue;
    }

    newLogs.push(updateLogStaminaFromLast({
      source: log,
      last: lastLog,
    }));
  }

  return newLogs;
};
