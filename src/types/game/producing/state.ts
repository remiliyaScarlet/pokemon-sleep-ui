export type ProducingState = 'awake' | 'sleep';

export const producingStateWithPack = [
  'awake',
  'sleepVacant',
  'sleepFilled',
] as const;

export type ProducingStateWithPack = typeof producingStateWithPack[number];

export const producingStateOfRate = [
  ...producingStateWithPack,
  'equivalent',
  'unfilledOnly',
] as const;

export type ProducingStateOfRate = typeof producingStateOfRate[number];
