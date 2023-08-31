import React from 'react';

import {PokemonNameSmall} from '@/components/shared/pokemon/name/small';
import {PokeInBox} from '@/types/game/pokebox';
import {PokemonInfo} from '@/types/game/pokemon';


type Props = {
  pokeInBox: PokeInBox,
  pokemon: PokemonInfo,
};

export const PokeInBoxMeta = ({pokemon, pokeInBox}: Props) => {
  return <PokemonNameSmall pokemon={pokemon} override={pokeInBox.name}/>;
};
