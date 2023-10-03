import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PokemonFrequencyFromProducingRate} from '@/components/shared/pokemon/frequency/fromRate';
import {PokeInBoxTableDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/table/details/type';


export const PokeInBoxTableFrequency = ({rateOfPokemon}: PokeInBoxTableDetailsProps) => {
  return (
    <Flex center noFullWidth className="w-36">
      <PokemonFrequencyFromProducingRate pokemonRate={rateOfPokemon} normalText/>
    </Flex>
  );
};
