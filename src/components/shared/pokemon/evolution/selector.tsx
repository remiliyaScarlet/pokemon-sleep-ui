import React from 'react';

import {PokemonClickableIcons} from '@/components/shared/pokemon/icon/clickable/main';
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
    <PokemonClickableIcons
      pokemonList={relatedPokemon}
      onClick={({id}) => onClick(id)}
      isActive={(id) => id === pokemon.id}
    />
  );
};
