import {durationOfDay} from '@/const/common';
import {efficiencyDuringSleep} from '@/const/game/efficiency';
import {StaminaCalcConfig, StaminaEventLog} from '@/types/game/producing/stamina';
import {SleepSessionInfo} from '@/types/game/sleep';
import {getEfficiency} from '@/utils/game/stamina/efficiency';
import {getLogsWithEfficiencyBlock} from '@/utils/game/stamina/events/block';
import {getLogsWithPrimarySleep} from '@/utils/game/stamina/events/primary';
import {getLogsWithSecondarySleep} from '@/utils/game/stamina/events/secondary';
import {getLogsWithSkillRecovery} from '@/utils/game/stamina/events/skill';


const getStaminaEfficiencyFromLogs = (logs: StaminaEventLog[]): number => {
  let sumOfWeightedDuration = (durationOfDay - logs[logs.length - 1].timing) * efficiencyDuringSleep;

  for (let i = 1; i < logs.length; i++) {
    const prev = logs[i - 1];
    const curr = logs[i];

    const blockEfficiency = prev.type === 'sleep' ? efficiencyDuringSleep : getEfficiency(prev.stamina.after);
    const duration = curr.timing - prev.timing;

    sumOfWeightedDuration += blockEfficiency * duration;
  }

  return sumOfWeightedDuration / durationOfDay;
};


type GetStaminaEfficiencyOpts = {
  config: StaminaCalcConfig,
  sessionInfo: SleepSessionInfo,
};

export const getStaminaEfficiency = ({config, sessionInfo}: GetStaminaEfficiencyOpts): number => {
  const {skillRecovery} = config;

  let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery});
  logs = getLogsWithSecondarySleep({sessionInfo, logs});
  logs = getLogsWithSkillRecovery({sessionInfo, skillRecovery, logs});
  logs = getLogsWithEfficiencyBlock({logs});

  return getStaminaEfficiencyFromLogs(logs);
};
