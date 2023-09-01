import React from 'react';

import {clsx} from 'clsx';
import Link from 'next-intl/link';

import {getToggleButtonClass} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex';
import {PokemonClickableIconImage} from '@/components/shared/pokemon/icon/clickable/image';
import {PokemonId, PokemonInfo} from '@/types/game/pokemon';
import {Dimension} from '@/types/style';


type Props = {
  pokemonList: PokemonInfo[],
  onClick?: (id: PokemonId) => void,
  isActive?: (id: PokemonId) => boolean,
  dimension?: Dimension,
  asButton?: boolean,
};

export const PokemonClickableIcons = ({pokemonList, onClick, isActive, dimension}: Props) => {
  return (
    <Flex direction="row" center wrap className="gap-1.5">
      {pokemonList.map(({id, type}) => {
        const className = clsx(
          'relative rounded-lg p-1',
          isActive ? getToggleButtonClass(isActive(id)) : 'button-clickable',
        );

        if (onClick) {
          return (
            <button key={id} onClick={() => onClick(id)} className={className}>
              <PokemonClickableIconImage id={id} type={type} dimension={dimension}/>
            </button>
          );
        }

        return (
          <Link key={id} href={`/pokedex/${id}`} className={className}>
            <PokemonClickableIconImage id={id} type={type} dimension={dimension}/>
          </Link>
        );
      })}
    </Flex>
  );
};
