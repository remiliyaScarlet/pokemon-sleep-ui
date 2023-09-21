import React from 'react';

import {PokemonFrequency} from '@/components/shared/pokemon/frequency/merged';
import {getRateOfPokemon} from '@/ui/team/pokebox/content/pokeInBox/utils';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';


export const PokeInBoxGridFrequency = (props: PokeInBoxCommonProps) => {
  const {pokemon} = props;

  const {berry, ingredient} = getRateOfPokemon(props);

  return (
    <PokemonFrequency
      baseFrequency={pokemon.stats.frequency}
      berryFrequency={berry.frequency}
      ingredientFrequency={Object.values(ingredient).at(0)?.frequency ?? NaN}
    />
  );
};
