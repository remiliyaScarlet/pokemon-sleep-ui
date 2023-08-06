import React from 'react';

import {FilterInputProps} from '@/components/input/filter/type';
import {Flex} from '@/components/layout/flex';
import {PokemonFilter} from '@/components/shared/pokemon/input/filter';
import {pokemonInputType} from '@/components/shared/pokemon/input/type';
import {AnalysisIndexFilter, AnalysisIndexProps} from '@/ui/analysis/index/type';


type Props = FilterInputProps<AnalysisIndexFilter> & AnalysisIndexProps;

export const AnalysisIndexInput = ({filter, setFilter, pokedex}: Props) => {
  return (
    <Flex direction="col" className="gap-1">
      {pokemonInputType.map((type) => (
        <PokemonFilter
          key={type}
          type={type}
          filterKey={type}
          pokemon={pokedex}
          filter={filter}
          setFilter={setFilter}
        />
      ))}
    </Flex>
  );
};
