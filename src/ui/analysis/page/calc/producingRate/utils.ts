import isEqual from 'lodash/isEqual';

import {ProducingRateOfPokemon} from '@/ui/analysis/page/calc/producingRate/type';


export const isRateOfPokemonSame = (a: ProducingRateOfPokemon, b: ProducingRateOfPokemon): boolean => {
  if (a.pokemon.id !== b.pokemon.id) {
    return false;
  }

  if (a.rate.berry.id !== b.rate.berry.id) {
    return false;
  }

  return isEqual(Object.keys(a.rate.ingredient), Object.keys(b.rate.ingredient));
};
