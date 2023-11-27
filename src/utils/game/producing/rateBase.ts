import {durationOfDay} from '@/const/common';
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
  const helpCount = durationOfDay / frequency;
  const proportion = count / picks;

  return {
    period: 'daily',
    energy: helpCount * proportion * energyPerCount,
    quantity: helpCount * proportion,
  };
};
