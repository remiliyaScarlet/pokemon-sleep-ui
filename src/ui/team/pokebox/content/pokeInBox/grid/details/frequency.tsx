import React from 'react';

import {PokemonFrequency} from '@/components/shared/pokemon/frequency/merged';
import {getRateOfBerry, getRateOfIngredients} from '@/ui/team/pokebox/content/pokeInBox/utils';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';


export const PokeInBoxFrequencyInGrid = (props: PokeInBoxCommonProps) => {
  const {pokemon} = props;

  const rateOfBerry = getRateOfBerry(props);
  const rateOfIngredients = getRateOfIngredients(props);

  return (
    <PokemonFrequency
      baseFrequency={pokemon.stats.frequency}
      berryFrequency={rateOfBerry.frequency}
      ingredientFrequency={rateOfIngredients.at(0)?.frequency ?? NaN}
    />
  );
};
