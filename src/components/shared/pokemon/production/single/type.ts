import React from 'react';

import {PokemonProducingRateProps} from '@/components/shared/pokemon/production/type';
import {ProducingRateOfStates} from '@/types/game/producing/rate';
import {ProducingStateOfRate} from '@/types/game/producing/state';
import {Dimension} from '@/types/style';


export const pokemonProducingRateSingleDisplay = [
  'item',
  'total',
] as const;

export type PokemonProducingRateSingleDisplay = typeof pokemonProducingRateSingleDisplay[number];

export type UsePokemonProducingRateSingleDisplayReturn = {
  display: PokemonProducingRateSingleDisplay,
  setDisplay: (updated: PokemonProducingRateSingleDisplay) => void,
};

export type PokemonProducingRateSingleProps = PokemonProducingRateProps & {
  rate: ProducingRateOfStates | null,
  getIcon: (dimension: Dimension) => React.ReactNode,
  display: PokemonProducingRateSingleDisplay,
  infoAtTotal?: React.ReactNode,
  dailyTotalEnergy?: number,
  state?: ProducingStateOfRate,
};
