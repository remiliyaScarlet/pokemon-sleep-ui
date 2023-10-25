import {SleepSessions, SleepSessionTimes} from '@/types/game/sleep';
import {StaminaSkillRecoveryConfig} from '@/types/game/stamina/skill';


export type StaminaSleepSessionConfig = SleepSessions<SleepSessionTimes>;

export type StaminaRecoveryRateConfig = {
  general: number,
  sleep: number,
};

export type StaminaCalcConfig = {
  sleepSession: StaminaSleepSessionConfig,
  skillRecovery: StaminaSkillRecoveryConfig,
  recoveryRate: StaminaRecoveryRateConfig,
};
