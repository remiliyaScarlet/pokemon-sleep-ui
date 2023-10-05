import {ProducingRate, ProducingRateOfStates} from '@/types/game/producing/rate';
import {ProducingStateOfRate} from '@/types/game/producing/state';


type GetProducingRateOfStateOpts = {
  rate: ProducingRateOfStates,
  state: ProducingStateOfRate,
};

export const toProducingRateOfState = ({rate, state}: GetProducingRateOfStateOpts): ProducingRate => {
  const {period, energy, quantity} = rate;

  return {
    period,
    energy: energy[state],
    quantity: quantity[state],
  };
};
