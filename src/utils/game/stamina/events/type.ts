import {StaminaEventLog, StaminaRecoveryRateConfig, StaminaSkillTriggerData} from '@/types/game/producing/stamina';
import {SleepSessionInfo} from '@/types/game/sleep';


export type GetLogsCommonOpts = {
  sessionInfo: SleepSessionInfo,
  logs: StaminaEventLog[],
  recoveryRate: StaminaRecoveryRateConfig,
  skillTriggers: StaminaSkillTriggerData[],
};

export type StaminaSkillRecoveryData = {
  timing: number,
  amount: number,
};
