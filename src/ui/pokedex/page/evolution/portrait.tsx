import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex';
import {UnavailableIcon} from '@/components/shared/common/unavailable';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
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
      <Flex direction="col" center noFullWidth className={clsx('button-disabled', dimension)}>
        <UnavailableIcon/>
      </Flex>
    );
  }

  return (
    <button className="button-clickable-bg" onClick={() => showPokemon(pokemon)}>
      <div className={clsx('relative', dimension)}>
        <PokemonImage pokemon={pokemon} image="portrait" isShiny={false}/>
      </div>
    </button>
  );
};
