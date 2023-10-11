import React from 'react';

import {clsx} from 'clsx';
import Link from 'next-intl/link';

import {getToggleButtonClass} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex/common';
import {PokemonClickableIconImage} from '@/components/shared/pokemon/icon/clickable/image';
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
  return (
    <Flex direction="row" center wrap className="gap-1.5">
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
          <Link key={id} href={`/pokedex/${id}`} className={className}>
            <PokemonClickableIconImage pokemon={pokemon} dimension={dimension}/>
          </Link>
        );
      })}
      {children && children((active) => clsx(
        'relative rounded-lg p-1',
        isActive ? getToggleButtonClass(active) : 'button-clickable',
      ))}
    </Flex>
  );
};
