import React from 'react';

import {Flex} from '@/components/layout/flex';
import {PokemonNameSmall} from '@/components/shared/pokemon/name/small';
import {PokeInBox} from '@/types/game/pokebox';
import {PokemonInfo} from '@/types/game/pokemon';


type Props = {
  pokeInBox: PokeInBox,
  pokemon: PokemonInfo,
};

export const PokeInBoxMeta = ({pokemon, pokeInBox}: Props) => {
  const {name, level} = pokeInBox;

  return (
    <Flex direction="row" center>
      <PokemonNameSmall pokemon={pokemon} override={name}/>
      <div className="self-end">
        <span className="text-xs">Lv</span>&nbsp;{level}
      </div>
    </Flex>
  );
};
