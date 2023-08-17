import {ProducingRate, ProducingRateProportion} from '@/types/game/producing/rate';


type GetProducingRateOpts = ProducingRateProportion & {
  frequency: number,
  energyPerCount: number,
};

export const getProducingRateBase = ({
  frequency,
  energyPerCount,
  count,
  picks,
}: GetProducingRateOpts): ProducingRate => {
  const quantity = 86400 / frequency;
  const dailyEnergy = quantity * energyPerCount;
  const proportion = count / picks;

  return {
    dailyEnergy: dailyEnergy * proportion,
    quantity: quantity * proportion,
  };
};
