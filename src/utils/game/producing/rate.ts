import {
  PokemonProducingRate,
  ProducingRate,
  ProducingRateOfItem,
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
  const quantity = 86400 / frequency;
  const dailyEnergy = quantity * energyPerCount;
  const proportion = count / picks;

  return {
    dailyEnergy: dailyEnergy * proportion,
    quantity: quantity * proportion,
  };
};

export const getDailyEnergyOfItemRates = (rates: ProducingRateOfItem[]) => (
  toSum(rates.map(({dailyEnergy}) => dailyEnergy))
);

export const getDailyEnergyOfRate = ({berry, ingredient}: PokemonProducingRate) => (
  berry.dailyEnergy + getDailyEnergyOfItemRates(Object.values(ingredient))
);
