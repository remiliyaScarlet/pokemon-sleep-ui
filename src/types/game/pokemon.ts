export const specialtyIdMap = {
  berry: 1,
  ingredient: 2,
  skill: 3,
};

export type ProducingRate = {
  quantity: number,
  dailyEnergy: number,
};

export type ProducingRateOfItem = ProducingRate & {
  id: number
};
