import React from 'react';

import {FilterInputProps} from '@/components/input/filter/type';
import {Flex} from '@/components/layout/flex';
import {PokemonFilter} from '@/components/shared/pokemon/input/filter';
import {pokemonInputType} from '@/components/shared/pokemon/input/type';
import {PokemonInfo} from '@/types/mongo/pokemon';
import {TeamAnalysisFilter} from '@/ui/team/analysis/type';


type Props = FilterInputProps<TeamAnalysisFilter> & {
  pokemon: PokemonInfo[],
};

export const TeamAnalysisPokemonFilter = ({pokemon, ...props}: Props) => {
  return (
    <Flex direction="col" className="gap-1">
      {pokemonInputType.map((type) => (
        <PokemonFilter
          key={type}
          type={type}
          filterKey={type}
          pokemon={pokemon}
          {...props}
        />
      ))}
    </Flex>
  );
};
