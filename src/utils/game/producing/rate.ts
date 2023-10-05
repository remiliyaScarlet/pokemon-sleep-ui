import {durationOfDay} from '@/const/common';
import {
  PokemonProducingRate,
  ProducingRate,
  ProducingRateOfStates,
  ProducingRateProportion,
} from '@/types/game/producing/rate';
import {toSum} from '@/utils/array';


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

export const getDailyEnergyOfItemRates = (rates: ProducingRateOfStates[]): number => (
  toSum(rates.map(({energy}) => energy.equivalent))
);

export const getDailyEnergyOfRate = ({berry, ingredient}: PokemonProducingRate): number => (
  berry.energy.equivalent + getDailyEnergyOfItemRates(Object.values(ingredient))
);
