import {SleepSessions, SleepSessionTimes} from '@/types/game/sleep';


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

export type StaminaCalcRecoveryRateConfig = {
  general: number,
  sleep: number,
};

export type StaminaCalcConfig = {
  sleepSession: StaminaCalcSleepSessionConfig,
  skillRecovery: StaminaCalcSkillRecoveryConfig,
  recoveryRate: StaminaCalcRecoveryRateConfig,
};

export type StaminaEventType = 'skillRecovery' | 'efficiencyBlock' | 'sleep' | 'wakeup';

export type StaminaAtEvent = {
  before: number,
  after: number,
};

export type StaminaEventLog = {
  timing: number,
  type: StaminaEventType,
  // `stamina` is whatever actually shown in game
  stamina: StaminaAtEvent,
  // `staminaUnderlying` could go negative, for calculation purposes
  staminaUnderlying: StaminaAtEvent,
};

export type StaminaEfficiency = {
  logs: StaminaEventLog[],
  average: number,
  awake: number,
  sleep: number,
};
