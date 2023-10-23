import React from 'react';

import {clsx} from 'clsx';

import {PokemonNameSmall} from '@/components/shared/pokemon/name/small';
import {PokeInBox} from '@/types/game/pokebox';
import {PokemonInfo} from '@/types/game/pokemon';


type Props = {
  pokeInBox: PokeInBox,
  pokemon: PokemonInfo,
};

export const PokeInBoxMeta = ({pokemon, pokeInBox}: Props) => {
  const {isFavorite} = pokeInBox;

  return (
    <PokemonNameSmall
      pokemon={pokemon}
      override={pokeInBox.name}
      className={clsx(
        isFavorite &&
        'text-amber-700 group-hover:text-amber-400 dark:text-amber-400 dark:group-hover:text-amber-700',
      )}
    />
  );
};
