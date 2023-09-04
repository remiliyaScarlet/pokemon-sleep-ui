export const efficiencyBreakPoints = [
  80,
  60,
  40,
  20,
] as const;

export type EfficiencyBreakPoint = typeof efficiencyBreakPoints[number];
