'use client';
import React from 'react';

import {EnergyAnalysisPokemonFilter} from '@/ui/energy/analysis/filter/main';
import {useEnergyAnalysisPokemonFilter} from '@/ui/energy/analysis/hook';
import {EnergyAnalysisTeam} from '@/ui/energy/analysis/team';
import {EnergyAnalysisDataProps} from '@/ui/energy/analysis/type';
import {isNotNullish} from '@/utils/type';


export const EnergyAnalysisClient = (props: EnergyAnalysisDataProps) => {
  const {pokedex} = props;
  const pokemon = Object.values(pokedex).filter(isNotNullish);
  const {filter, setFilter, isIncluded} = useEnergyAnalysisPokemonFilter({data: pokemon});

  return (
    <>
      <EnergyAnalysisPokemonFilter filter={filter} setFilter={setFilter} pokemon={pokemon}/>
      <EnergyAnalysisTeam
        pokemonSelectableInclusionMap={isIncluded} snorlaxFavorite={filter.snorlaxFavorite}
        pokemon={pokemon} {...props}
      />
    </>
  );
};
