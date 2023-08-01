'use client';
import React from 'react';

import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {EnergyAnalysisPokemonFilter} from '@/ui/energy/analysis/filter/main';
import {useEnergyAnalysisPokemonFilter} from '@/ui/energy/analysis/hook';
import {EnergyAnalysisAnalysis} from '@/ui/energy/analysis/result/main';
import {EnergyAnalysisSelectablePokemon} from '@/ui/energy/analysis/selectable';
import {EnergyAnalysisProps, EnergyAnalysisInputProps} from '@/ui/energy/analysis/type';
import {isNotNullish} from '@/utils/type';


export const EnergyAnalysisClient = (props: EnergyAnalysisProps) => {
  const {pokedex} = props;
  const pokemon = Object.values(pokedex).filter(isNotNullish);
  const {filter, setFilter, isIncluded} = useEnergyAnalysisPokemonFilter({data: pokemon});

  const inputProps: EnergyAnalysisInputProps = {
    filter,
    setFilter,
    pokemon,
  };

  return (
    <>
      <EnergyAnalysisPokemonFilter {...inputProps}/>
      <div className="h-80 overflow-y-scroll md:h-60 lg:h-40">
        <EnergyAnalysisSelectablePokemon isIncluded={isIncluded} {...inputProps}/>
      </div>
      <HorizontalSplitter/>
      <EnergyAnalysisAnalysis filter={filter} setFilter={setFilter} {...props}/>
    </>
  );
};
