import React from 'react';

import {PokemonIconClickable} from '@/components/shared/pokemon/icon/clickable';
import {PokedexMap, PokemonId, PokemonInfo} from '@/types/game/pokemon';
import {isNotNullish} from '@/utils/type';


type Props = {
  pokemon: PokemonInfo,
  pokedex: PokedexMap,
  onClick: (id: PokemonId) => void,
};

export const PokemonEvolutionSelector = ({pokemon, pokedex, onClick}: Props) => {
  const {evolution} = pokemon;
  const relatedPokemon = [evolution.previous, pokemon.id, ...evolution.next.map(({id}) => id)]
    .filter(isNotNullish)
    .map((id) => pokedex[id])
    .filter(isNotNullish);

  return (
    <PokemonIconClickable
      pokemonList={relatedPokemon}
      onClick={onClick}
      isActive={(id) => id === pokemon.id}
    />
  );
};
