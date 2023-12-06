import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {PokemonClickableIconImage} from '@/components/shared/pokemon/icon/clickable/image';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {getToggleButtonClass} from '@/styles/input';
import {PokemonId, PokemonInfo} from '@/types/game/pokemon';
import {Dimension} from '@/types/style';


type Props = {
  pokemonList: PokemonInfo[],
  onClick?: (pokemon: PokemonInfo) => void,
  isActive?: (id: PokemonId) => boolean,
  dimension?: Dimension,
  children?: (getClassName: (active: boolean) => string) => React.ReactNode,
};

export const PokemonClickableIcons = ({pokemonList, onClick, isActive, dimension, children}: Props) => {
  const {state, setState, showPokemon} = usePokemonLinkPopup();

  return (
    <Flex direction="row" noFullWidth center wrap className="gap-1.5">
      <PokemonLinkPopup state={state} setState={setState}/>
      {pokemonList.map((pokemon) => {
        const id = pokemon?.id ?? null;

        const className = clsx(
          'relative rounded-lg p-1',
          isActive ? getToggleButtonClass(isActive(id)) : 'button-clickable',
        );

        if (onClick) {
          return (
            <button key={id ?? NaN} onClick={() => onClick(pokemon)} className={className}>
              <PokemonClickableIconImage pokemon={pokemon} dimension={dimension}/>
            </button>
          );
        }

        return (
          <button key={id} className={className} onClick={() => showPokemon(pokemon)}>
            <PokemonClickableIconImage pokemon={pokemon} dimension={dimension}/>
          </button>
        );
      })}
      {children && children((active) => clsx(
        'relative rounded-lg p-1',
        isActive ? getToggleButtonClass(active) : 'button-clickable',
      ))}
    </Flex>
  );
};
