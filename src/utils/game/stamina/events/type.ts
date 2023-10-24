import {StaminaCalcRecoveryRateConfig, StaminaEventLog} from '@/types/game/producing/stamina';
import {SleepSessionInfo} from '@/types/game/sleep';


export type GetLogsCommonOpts = {
  sessionInfo: SleepSessionInfo,
  logs: StaminaEventLog[],
  recoveryRate: StaminaCalcRecoveryRateConfig,
};
