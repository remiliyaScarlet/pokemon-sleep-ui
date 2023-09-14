import React from 'react';

import {Flex} from '@/components/layout/flex';
import {PokemonFrequency} from '@/components/shared/pokemon/frequency/merged';
import {PokeInBoxTableDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/table/details/type';


export const PokeInBoxTableFrequency = (props: PokeInBoxTableDetailsProps) => {
  const {
    pokemon,
    rateOfBerry,
    rateOfIngredients,
  } = props;

  return (
    <Flex direction="col" center noFullWidth className="w-60">
      <PokemonFrequency
        baseFrequency={pokemon.stats.frequency}
        berryFrequency={rateOfBerry.frequency}
        ingredientFrequency={rateOfIngredients.at(0)?.frequency ?? NaN}
      />
    </Flex>
  );
};
