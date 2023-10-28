export type MealStrengthInfo = {
  strengthBase: number,
  strengthFinal: number,
  bonusRate: number,
};

export type MealStrengthInfoFinal = MealStrengthInfo & {
  bonusRateWithFiller: number,
};
