import React from 'react';

import {Flex} from '@/components/layout/flex';
import {PokemonIconList} from '@/components/shared/pokemon/iconList';
import {PokemonInfo} from '@/types/mongo/pokemon';


type Props = {
  obtainablePokemon: PokemonInfo[],
  ingredientId: number,
};

export const IngredientObtainablePokemon = ({obtainablePokemon, ingredientId}: Props) => {
  const pokemonMap = Object.fromEntries(obtainablePokemon.map((pokemon) => [pokemon.id, pokemon]));

  return (
    <Flex direction="row" className="info-section">
      <PokemonIconList
        pokemonIds={obtainablePokemon.map(({id}) => id)}
        getInfo={(id) => `#${pokemonMap[id].ingredients.indexOf(ingredientId) + 1}`}
      />
    </Flex>
  );
};
