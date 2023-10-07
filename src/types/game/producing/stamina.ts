import {SleepSessionTimes, SleepSessions} from '@/types/game/sleep';


export const staminaCalcSkillRecoveryStrategies = [
  'optimistic',
  'conservative',
];

export type StaminaCalcSkillRecoveryStrategy = typeof staminaCalcSkillRecoveryStrategies[number];

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

export type StaminaEventType = 'skillRecovery' | 'efficiencyBlock' | 'sleep' | 'wakeup';

export type StaminaEventLog = {
  timing: number,
  type: StaminaEventType,
  stamina: {
    before: number,
    after: number,
  },
};

export type StaminaEfficiency = {
  logs: StaminaEventLog[],
  average: number,
  awake: number,
  sleep: number,
};
