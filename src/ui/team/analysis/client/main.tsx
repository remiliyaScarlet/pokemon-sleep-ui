'use client';
import React from 'react';

import {UserDataLazyLoad} from '@/components/shared/userData/lazyLoad';
import {TeamAnalysisLoadedClient} from '@/ui/team/analysis/client/loaded';
import {TeamAnalysisServerDataProps} from '@/ui/team/analysis/type';
import {getPokemonMaxEvolutionCount} from '@/utils/game/pokemon';
import {isNotNullish} from '@/utils/type';


export const TeamAnalysisClient = (props: TeamAnalysisServerDataProps) => {
  const {pokedexMap} = props;

  const maxEvolutionCount = getPokemonMaxEvolutionCount(Object.values(pokedexMap).filter(isNotNullish));

  return (
    <UserDataLazyLoad
      options={{type: 'teamAnalysis'}}
      loadingText="Team"
      content={(data, session) => (
        <TeamAnalysisLoadedClient
          preloaded={data?.teamAnalysis}
          maxEvolutionCount={maxEvolutionCount}
          settings={session.data?.user.preloaded.settings}
          {...props}
        />
      )}
    />
  );
};
