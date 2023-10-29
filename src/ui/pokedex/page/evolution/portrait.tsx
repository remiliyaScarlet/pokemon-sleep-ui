import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {UnavailableIcon} from '@/components/shared/common/unavailable';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonClickablePortrait} from '@/components/shared/pokemon/portrait/main';
import {PokemonInfo} from '@/types/game/pokemon';
import {Dimension} from '@/types/style';


type Props = {
  pokemon: PokemonInfo | undefined,
  dimension: Dimension,
  showPokemon: ReturnType<typeof usePokemonLinkPopup>['showPokemon'],
};

export const PokemonEvolutionPortrait = ({pokemon, dimension, showPokemon}: Props) => {
  if (!pokemon) {
    return (
      <Flex center noFullWidth className={clsx('button-disabled shrink-0', dimension)}>
        <UnavailableIcon/>
      </Flex>
    );
  }

  return (
    <PokemonClickablePortrait
      pokemon={pokemon.id}
      dimension={dimension}
      onClick={() => showPokemon(pokemon)}
    />
  );
};
