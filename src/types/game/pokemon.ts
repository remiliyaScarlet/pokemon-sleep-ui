export const specialtyIdMap = {
  berry: 1,
  ingredient: 2,
  skill: 3,
};

export type ProductionRate = {
  quantity: number,
  dailyEnergy: number,
};

export type ProductionRateOfItem = ProductionRate & {
  id: number
};
