import {staminaStartingDefault} from '@/const/game/stamina';
import {StaminaEventLog} from '@/types/game/stamina/event';
import {StaminaSkillRecoveryConfig, StaminaSkillTriggerData} from '@/types/game/stamina/skill';
import {toSum} from '@/utils/array';
import {getStaminaAfterDuration} from '@/utils/game/stamina/depletion';
import {GetLogsCommonOpts} from '@/utils/game/stamina/events/type';
import {getActualRecoveryAmount} from '@/utils/game/stamina/events/utils';


type GetInitialSkillRecoveryAmountOpts = Pick<GetLogsCommonOpts, 'recoveryRate'> & {
  skillTriggers: StaminaSkillTriggerData[],
  skillRecovery: StaminaSkillRecoveryConfig,
};

const getInitialSkillRecoveryAmount = ({
  recoveryRate,
  skillTriggers,
  skillRecovery,
}: GetInitialSkillRecoveryAmountOpts): number => {
  const {strategy} = skillRecovery;

  if (strategy === 'conservative') {
    return 0;
  }

  return toSum(skillTriggers.map(({dailyCount, amount}) => (
    dailyCount * getActualRecoveryAmount({amount, recoveryRate, isSleep: false})
  )));
};

type GetLogsWithPrimarySleepOpts = Omit<GetLogsCommonOpts, 'logs'> & {
  skillRecovery: StaminaSkillRecoveryConfig,
};

export const getLogsWithPrimarySleep = ({sessionInfo, ...opts}: GetLogsWithPrimarySleepOpts): StaminaEventLog[] => {
  const {session, duration} = sessionInfo;
  const {primary} = session;

  const wakeupStamina = staminaStartingDefault + getInitialSkillRecoveryAmount(opts);
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
