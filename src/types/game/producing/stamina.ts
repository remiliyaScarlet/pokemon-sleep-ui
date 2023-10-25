import {SleepSessions, SleepSessionTimes} from '@/types/game/sleep';


export const staminaSkillRecoveryStrategies = [
  'optimistic',
  'conservative',
];

export type StaminaSkillRecoveryStrategy = typeof staminaSkillRecoveryStrategies[number];

export type StaminaSkillRecoveryConfig = {
  strategy: StaminaSkillRecoveryStrategy,
  dailyCount: number,
  amount: number,
};

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
