import {staminaStartingDefault} from '@/const/game/stamina';
import {StaminaCalcSkillRecoveryConfig, StaminaEventLog} from '@/types/game/producing/stamina';
import {getStaminaAfterDuration} from '@/utils/game/stamina/depletion';
import {GetLogsCommonOpts} from '@/utils/game/stamina/events/type';
import {getActualRecoveryAmount} from '@/utils/game/stamina/events/utils';


type GetLogsWithPrimarySleepOpts = Omit<GetLogsCommonOpts, 'logs'> & {
  skillRecovery: StaminaCalcSkillRecoveryConfig,
};

export const getLogsWithPrimarySleep = ({
  sessionInfo,
  skillRecovery,
  recoveryRate,
}: GetLogsWithPrimarySleepOpts): StaminaEventLog[] => {
  const {session, duration} = sessionInfo;
  const {strategy, dailyCount, amount} = skillRecovery;
  const {primary} = session;
  const recovery = getActualRecoveryAmount({amount, recoveryRate, isSleep: false});

  const wakeupStamina = staminaStartingDefault + (strategy === 'optimistic' ? dailyCount * recovery : 0);
  const sleepStamina = getStaminaAfterDuration({
    start: wakeupStamina,
    duration: duration.awake,
  });

  return [
    {
      type: 'wakeup',
      timing: primary.adjustedTiming.end,
      stamina: {before: sleepStamina.inGame, after: wakeupStamina},
      staminaUnderlying: {before: sleepStamina.actual, after: wakeupStamina},
    },
    {
      type: 'sleep',
      timing: primary.adjustedTiming.start,
      stamina: {before: sleepStamina.inGame, after: wakeupStamina},
      staminaUnderlying: {before: sleepStamina.actual, after: wakeupStamina},
    },
  ];
};
