export const productionPeriod = [
  'daily',
  'weekly',
] as const;

export type ProductionPeriod = typeof productionPeriod[number];
