import {SleepSessionTimes, SleepSessions} from '@/types/game/sleep';


export type StaminaCalcSkillRecoveryStrategy = 'optimistic' | 'conservative';

export type StaminaCalcSkillRecoveryConfig = {
  strategy: StaminaCalcSkillRecoveryStrategy,
  dailyCount: number,
  amount: number,
};

export type StaminaCalcSleepSessionConfig = SleepSessions<SleepSessionTimes>;

export type StaminaCalcConfig = {
  sleepSession: StaminaCalcSleepSessionConfig,
  skillRecovery: StaminaCalcSkillRecoveryConfig,
};

export type StaminaEventLog = {
  timing: number,
  type: 'skillRecovery' | 'efficiencyBlock' | 'sleep' | 'wakeup',
  stamina: {
    before: number,
    after: number,
  },
};
