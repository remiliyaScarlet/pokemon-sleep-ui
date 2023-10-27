export const mealRarityBonusBreakPoints = [
  40,
  30,
  20,
  10,
  1,
] as const;

export type MealRarityBonusBreakPoint = typeof mealRarityBonusBreakPoints[number];
