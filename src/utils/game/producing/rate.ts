import {ProducingRate} from '@/types/game/producing/rate';


type GetProducingRateOpts = {
  frequency: number,
  energyPerCount: number,
  count: number,
  possibilities: number,
};

export const getProducingRateBase = ({
  frequency,
  energyPerCount,
  count,
  possibilities,
}: GetProducingRateOpts): ProducingRate => {
  const quantity = 86400 / frequency;
  const dailyEnergy = quantity * energyPerCount;
  const proportion = count / possibilities;

  return {
    dailyEnergy: dailyEnergy * proportion,
    quantity: quantity * proportion,
  };
};
