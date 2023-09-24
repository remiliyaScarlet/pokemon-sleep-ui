import React from 'react';

import {PokemonFrequency} from '@/components/shared/pokemon/frequency/main';
import {PokemonFrequencyProps} from '@/components/shared/pokemon/frequency/type';
import {durationOfDay} from '@/const/common';
import {PokemonProducingRate} from '@/types/game/producing/rate';


type Props = PokemonFrequencyProps & {
  pokemonRate: PokemonProducingRate,
};

export const PokemonFrequencyFromProducingRate = ({pokemonRate, ...props}: Props) => {
  const {berry, ingredient} = pokemonRate;

  const dailyCount = (
    durationOfDay / berry.frequency +
    durationOfDay / (Object.values(ingredient).at(0)?.frequency ?? NaN)
  );

  return <PokemonFrequency frequency={durationOfDay / dailyCount} {...props}/>;
};
