import React from 'react';

import {Flex} from '@/components/layout/flex';
import {PokemonNameSmall} from '@/components/shared/pokemon/name/small';
import {PokeboxPokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';


export const PokeboxPokeInBoxFixedInfo = ({pokemon, pokeInBox}: PokeboxPokeInBoxCommonProps) => {
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
