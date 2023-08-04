export type ProducingRate = {
  quantity: number,
  dailyEnergy: number,
};

export type ProducingRateOfItem = ProducingRate & {
  id: number
};

export type PokemonProducingRate = {
  berry: ProducingRateOfItem,
  ingredient: ProducingRateOfItem | null,
};
