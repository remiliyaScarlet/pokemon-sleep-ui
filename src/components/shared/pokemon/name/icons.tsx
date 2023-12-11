import React from 'react';

import {PokemonTypeIcon} from '@/components/shared/icon/pokeType';
import {PokemonEventOnlyIcon} from '@/components/shared/pokemon/icon/eventOnly';
import {PokemonInfo} from '@/types/game/pokemon';
import {Dimension} from '@/types/style';


type Props = {
  pokemon: PokemonInfo,
  dimension: Dimension,
};

export const PokemonNameIcons = ({pokemon, dimension}: Props) => {
  const {type} = pokemon;

  return (
    <>
      <PokemonEventOnlyIcon pokemon={pokemon} dimension={dimension}/>
      <PokemonTypeIcon type={type} dimension={dimension}/>
    </>
  );
};
