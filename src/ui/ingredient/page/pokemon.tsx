import React from 'react';

import {Flex} from '@/components/layout/flex';
import {PokemonIconList} from '@/components/shared/pokemon/iconList';
import {infoSectionStyle} from '@/styles/classes';
import {PokemonId} from '@/types/mongo/pokemon';


type Props = {
  obtainablePokemonIds: PokemonId[],
};

export const IngredientObtainablePokemon = ({obtainablePokemonIds}: Props) => {
  return (
    <Flex direction="row" className={infoSectionStyle}>
      <PokemonIconList pokemonIds={obtainablePokemonIds}/>
    </Flex>
  );
};
