import React from 'react';

import {Flex} from '@/components/layout/flex';
import {PokemonIconList} from '@/components/shared/pokemon/iconList';
import {infoSectionStyle} from '@/styles/classes';
import {PokemonId} from '@/types/mongo/pokemon';
import {classNames} from '@/utils/react';


type Props = {
  obtainablePokemonIds: PokemonId[],
};

export const IngredientObtainablePokemon = ({obtainablePokemonIds}: Props) => {
  return (
    <Flex direction="row" className={classNames(infoSectionStyle, 'md:w-1/2')}>
      <PokemonIconList pokemonIds={obtainablePokemonIds}/>
    </Flex>
  );
};
