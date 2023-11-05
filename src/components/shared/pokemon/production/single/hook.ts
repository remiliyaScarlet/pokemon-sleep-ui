import React from 'react';


import {
  PokemonProducingRateSingleDisplay,
  UsePokemonProducingRateSingleDisplayReturn,
} from '@/components/shared/pokemon/production/single/type';


export const usePokemonProducingRateSingleDisplay = (): UsePokemonProducingRateSingleDisplayReturn => {
  const [
    display,
    setDisplay,
  ] = React.useState<PokemonProducingRateSingleDisplay>('item');

  return {
    display,
    setDisplay,
  };
};
