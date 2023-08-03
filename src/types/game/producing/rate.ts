export type ProducingRate = {
  quantity: number,
  dailyEnergy: number,
};

export type ProducingRateOfItem = ProducingRate & {
  id: number
};
