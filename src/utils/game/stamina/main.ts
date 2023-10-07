import {durationOfDay} from '@/const/common';
import {efficiencyInSleep} from '@/const/game/efficiency';
import {StaminaCalcConfig, StaminaEfficiency, StaminaEventLog} from '@/types/game/producing/stamina';
import {SleepSessionInfo} from '@/types/game/sleep';
import {getEfficiency} from '@/utils/game/stamina/efficiency';
import {getLogsWithEfficiencyBlock} from '@/utils/game/stamina/events/block';
import {getLogsWithPrimarySleep} from '@/utils/game/stamina/events/primary';
import {getLogsWithSecondarySleep} from '@/utils/game/stamina/events/secondary';
import {getLogsWithSkillRecovery} from '@/utils/game/stamina/events/skill';


type GetStaminaEventLogOpts = {
  config: StaminaCalcConfig,
  sessionInfo: SleepSessionInfo,
};

export const getStaminaEventLogs = ({config, sessionInfo}: GetStaminaEventLogOpts): StaminaEventLog[] => {
  const {skillRecovery} = config;

  let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery});
  logs = getLogsWithSecondarySleep({sessionInfo, logs});
  logs = getLogsWithSkillRecovery({sessionInfo, skillRecovery, logs});
  logs = getLogsWithEfficiencyBlock({logs});

  return logs;
};

const getStaminaEfficiencyFromLogs = (logs: StaminaEventLog[]): number => {
  let sumOfWeightedDuration = (durationOfDay - logs[logs.length - 1].timing) * efficiencyInSleep;

  for (let i = 1; i < logs.length; i++) {
    const prev = logs[i - 1];
    const curr = logs[i];

    const blockEfficiency = prev.type === 'sleep' ? efficiencyInSleep : getEfficiency(prev.stamina.after);
    const duration = curr.timing - prev.timing;

    sumOfWeightedDuration += blockEfficiency * duration;
  }

  return sumOfWeightedDuration / durationOfDay;
};

export const getStaminaEfficiency = (opts: GetStaminaEventLogOpts): StaminaEfficiency => {
  const {sessionInfo} = opts;

  const staminaDailyAverage = getStaminaEfficiencyFromLogs(getStaminaEventLogs(opts));
  const totalSleepDuration = durationOfDay - sessionInfo.duration.awake;

  return {
    average: staminaDailyAverage,
    sleep: efficiencyInSleep,
    awake: (
      (staminaDailyAverage * durationOfDay - efficiencyInSleep * totalSleepDuration) /
      (durationOfDay - totalSleepDuration)
    ),
  };
};
