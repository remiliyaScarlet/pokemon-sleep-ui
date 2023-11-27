export const applyMultiplierTargets = [
  'frequency',
  'quantity',
  'energy',
] as const;

export type ApplyMultiplierTarget = typeof applyMultiplierTargets[number];
