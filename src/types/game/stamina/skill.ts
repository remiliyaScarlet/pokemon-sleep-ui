export const staminaSkillRecoveryStrategies = [
  'optimistic',
  'conservative',
] as const;

export type StaminaSkillRecoveryStrategy = typeof staminaSkillRecoveryStrategies[number];

export type StaminaSkillRecoveryConfig = {
  strategy: StaminaSkillRecoveryStrategy,
};

export type StaminaSkillTriggerData = {
  dailyCount: number,
  amount: number,
};
