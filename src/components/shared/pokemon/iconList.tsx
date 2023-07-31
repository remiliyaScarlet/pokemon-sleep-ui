import React from 'react';

import {PokemonIconListDuplicable} from '@/components/shared/pokemon/iconListDuplicable';
import {PokemonId} from '@/types/mongo/pokemon';


type Props = {
  pokemonIds: PokemonId[] | undefined,
  getInfo?: (id: PokemonId) => React.ReactNode,
};

export const PokemonIconList = ({pokemonIds, getInfo}: Props) => {
  return (
    <PokemonIconListDuplicable
      dataWithPokemonId={pokemonIds}
      getPokemonId={(id) => id}
      getInfo={(id) => getInfo && getInfo(id)}
    />
  );
};
