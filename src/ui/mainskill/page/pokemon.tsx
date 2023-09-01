'use client';
import React from 'react';

import {Flex} from '@/components/layout/flex';
import {PokemonClickableIcons} from '@/components/shared/pokemon/icon/clickable/main';
import {PokemonInfo} from '@/types/game/pokemon';


type Props = {
  pokemonList: PokemonInfo[],
};

export const MainSkillAvailablePokemon = ({pokemonList}: Props) => {
  return (
    <Flex direction="col" className="info-section">
      <PokemonClickableIcons pokemonList={pokemonList} dimension="h-16 w-16"/>
    </Flex>
  );
};
