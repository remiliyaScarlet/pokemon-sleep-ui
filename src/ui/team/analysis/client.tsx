'use client';
import React from 'react';

import {AuthProvider} from '@/contexts/auth';
import {TeamAnalysisPokemonFilter} from '@/ui/team/analysis/filter/main';
import {useTeamAnalysisPokemonFilter} from '@/ui/team/analysis/hook';
import {TeamAnalysisUI} from '@/ui/team/analysis/team';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';
import {isNotNullish} from '@/utils/type';


export const TeamAnalysisClient = (props: TeamAnalysisDataProps) => {
  const {pokedex, mapMeta, session} = props;
  const pokemon = Object.values(pokedex).filter(isNotNullish);
  const {filter, setFilter, isIncluded} = useTeamAnalysisPokemonFilter({
    data: pokemon,
    snorlaxFavorite: session?.user.data.teamAnalysisSetup?.snorlaxFavorite,
  });

  return (
    <>
      <TeamAnalysisPokemonFilter filter={filter} setFilter={setFilter} pokemon={pokemon} mapMeta={mapMeta}/>
      <AuthProvider>
        <TeamAnalysisUI
          pokemonSelectableInclusionMap={isIncluded} snorlaxFavorite={filter.snorlaxFavorite}
          pokemon={pokemon} {...props}
        />
      </AuthProvider>
    </>
  );
};
