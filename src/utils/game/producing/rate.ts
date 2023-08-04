import {ProducingRate} from '@/types/game/producing/rate';


type GetProducingRateOpts = {
  frequency: number,
  energyPerCount: number,
  countPerHelp: number,
};

export const getProducingRate = ({frequency, energyPerCount, countPerHelp}: GetProducingRateOpts): ProducingRate => {
  const quantity = 86400 / frequency * countPerHelp;
  const dailyEnergy = quantity * energyPerCount;

  return {dailyEnergy, quantity};
};
