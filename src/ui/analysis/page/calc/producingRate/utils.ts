import isEqual from 'lodash/isEqual';

import {PokemonProducingRate, ProducingRateOfItem} from '@/types/game/producing/rate';
import {ProducingRateOfPokemon} from '@/ui/analysis/page/calc/producingRate/type';
import {toSum} from '@/utils/array';


export const getDailyEnergyOfItemRates = (rates: ProducingRateOfItem[]) => (
  toSum(rates.map(({dailyEnergy}) => dailyEnergy))
);

export const getDailyEnergyOfRate = ({berry, ingredient}: PokemonProducingRate) => (
  berry.dailyEnergy + getDailyEnergyOfItemRates(Object.values(ingredient))
);

export const isRateOfPokemonSame = (a: ProducingRateOfPokemon, b: ProducingRateOfPokemon): boolean => {
  if (a.pokemon.id !== b.pokemon.id) {
    return false;
  }

  if (a.rate.berry.id !== b.rate.berry.id) {
    return false;
  }

  return isEqual(Object.keys(a.rate.ingredient), Object.keys(b.rate.ingredient));
};
