'use client';
import React from 'react';

import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonIconList} from '@/components/shared/pokemon/icon/list';
import {useAnalysisIndexFilter} from '@/ui/analysis/index/hook';
import {AnalysisIndexInput} from '@/ui/analysis/index/input';
import {AnalysisIndexProps} from '@/ui/analysis/index/type';


export const AnalysisIndexClient = (props: AnalysisIndexProps) => {
  const {pokedex} = props;
  const {filter, setFilter, isIncluded} = useAnalysisIndexFilter({data: pokedex});

  return (
    <>
      <AnalysisIndexInput filter={filter} setFilter={setFilter} {...props}/>
      <HorizontalSplitter/>
      <PokemonIconList
        dataWithPokemonId={pokedex.filter(({id}) => isIncluded[id])}
        getPokemonId={({id}) => id}
        getPokemonLink={(id) => `/analysis/${id}`}
        size="h-16 w-16"
      />
    </>
  );
};
