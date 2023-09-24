import React from 'react';

import {PokemonFrequencyFromProducingRate} from '@/components/shared/pokemon/frequency/fromRate';
import {getRateOfPokemon} from '@/ui/team/pokebox/content/pokeInBox/utils';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';


export const PokeInBoxGridFrequency = (props: PokeInBoxCommonProps) => {
  const pokemonRate = getRateOfPokemon(props);

  return <PokemonFrequencyFromProducingRate pokemonRate={pokemonRate} normalText/>;
};
