import {
  StaminaRecoveryRateConfig,
  StaminaSkillRecoveryConfig,
  StaminaEventLog,
} from '@/types/game/producing/stamina';
import {SleepSessionInfo} from '@/types/game/sleep';
import {getStaminaAfterDuration} from '@/utils/game/stamina/depletion';
import {GetLogsCommonOpts, StaminaSkillRecoveryData} from '@/utils/game/stamina/events/type';
import {
  getActualRecoveryAmount,
  offsetEventLogStamina,
  updateLogStaminaFromLast,
} from '@/utils/game/stamina/events/utils';
import {generateDecimalsAndOnes} from '@/utils/number';


type GetSkillRecoveryTimingsOpts = {
  skillRecovery: StaminaSkillRecoveryConfig,
  secondarySession: SleepSessionInfo['session']['secondary'],
  awakeDuration: number,
  recoveryRate: StaminaRecoveryRateConfig,
};

export const getSkillRecoveryData = ({
  skillRecovery,
  secondarySession,
  awakeDuration,
  recoveryRate,
}: GetSkillRecoveryTimingsOpts): StaminaSkillRecoveryData[] => {
  const {dailyCount, amount} = skillRecovery;

  return [...generateDecimalsAndOnes(dailyCount)].map((weight, idx): StaminaSkillRecoveryData => {
    let expectedTiming = awakeDuration * (idx + 1) / (Math.max(1, Math.floor(dailyCount)) + 1);

    if (secondarySession && expectedTiming > secondarySession.adjustedTiming.start) {
      expectedTiming += secondarySession.length;
    }

    return {
      timing: expectedTiming,
      amount: getActualRecoveryAmount({amount: amount * weight, recoveryRate, isSleep: false}),
    };
  });
};

type GetLogsWithSkillRecoveryOpts = GetLogsCommonOpts & {
  skillRecovery: StaminaSkillRecoveryConfig,
};

export const getLogsWithSkillRecovery = ({
  sessionInfo,
  skillRecovery,
  logs,
  recoveryRate,
}: GetLogsWithSkillRecoveryOpts): StaminaEventLog[] => {
  const {strategy, dailyCount, amount} = skillRecovery;

  if (strategy !== 'conservative' || dailyCount === 0 || amount === 0) {
    return [...logs];
  }

  const {session, duration} = sessionInfo;
  const {secondary} = session;

  const newLogs: StaminaEventLog[] = [logs[0]];
  const skillRecoveries = getSkillRecoveryData({
    skillRecovery,
    secondarySession: secondary,
    awakeDuration: duration.awake,
    recoveryRate,
  });
  let skillUsedCount = 0;

  for (const log of logs.slice(1)) {
    let recoveryData = skillRecoveries.at(skillUsedCount);

    while (recoveryData && log.timing >= recoveryData.timing) {
      const latest = newLogs[newLogs.length - 1];
      const staminaBefore = getStaminaAfterDuration({
        start: latest.stamina.after,
        duration: recoveryData.timing - latest.timing,
      });

      newLogs.push({
        type: 'skillRecovery',
        timing: recoveryData.timing,
        stamina: {
          before: staminaBefore.inGame,
          after: staminaBefore.inGame + recoveryData.amount,
        },
        staminaUnderlying: {
          before: staminaBefore.inGame,
          after: staminaBefore.inGame + recoveryData.amount,
        },
      });
      skillUsedCount += 1;
      recoveryData = skillRecoveries.at(skillUsedCount);
    }

    // Using indexer to guarantee the last log is returned
    // This shouldn't fail because `newLogs` already have something inside at the beginning
    const lastLog = newLogs[newLogs.length - 1];

    if (!skillUsedCount || lastLog.type !== 'skillRecovery') {
      newLogs.push(offsetEventLogStamina({
        log,
        offset: skillUsedCount * getActualRecoveryAmount({amount, recoveryRate, isSleep: false}),
      }));
      continue;
    }

    newLogs.push(updateLogStaminaFromLast({
      source: log,
      last: lastLog,
    }));
  }

  return newLogs;
};
