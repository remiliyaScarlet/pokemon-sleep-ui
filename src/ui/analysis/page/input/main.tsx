import React from 'react';

import {InputRow} from '@/components/input/filter/row';
import {FilterInputProps} from '@/components/input/filter/type';
import {Flex} from '@/components/layout/flex';
import {PokemonFilter} from '@/components/shared/pokemon/input/filter';
import {pokemonInputType} from '@/components/shared/pokemon/input/type';
import {PokemonLevelSlider} from '@/components/shared/pokemon/levelSlider';
import {AnalysisComparisonFilter, AnalysisPageCommonProps} from '@/ui/analysis/page/type';


type Props = FilterInputProps<AnalysisComparisonFilter> & AnalysisPageCommonProps & {
  maxLevel: number,
};

export const AnalysisPageInput = ({filter, setFilter, maxLevel, pokedex}: Props) => {
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
      <InputRow>
        <Flex direction="col" className="p-1">
          <PokemonLevelSlider level={filter.level} maxLevel={maxLevel} setLevel={(level) => setFilter((original) => ({
            ...original,
            level,
          } satisfies AnalysisComparisonFilter))}/>
        </Flex>
      </InputRow>
    </Flex>
  );
};
