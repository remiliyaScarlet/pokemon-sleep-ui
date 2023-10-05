import {ProducingRate, ProducingRateOfStates} from '@/types/game/producing/rate';
import {ProducingStateOfRate} from '@/types/game/producing/state';


type GetProducingRateOfStateOpts = {
  rate: ProducingRateOfStates,
  state: ProducingStateOfRate,
};

export const toProducingRateOfState = ({rate, state}: GetProducingRateOfStateOpts): ProducingRate => {
  const {dailyEnergy, quantity} = rate;

  return {
    dailyEnergy: dailyEnergy[state],
    quantity: quantity[state],
  };
};
