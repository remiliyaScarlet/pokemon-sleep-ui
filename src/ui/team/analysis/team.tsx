import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {FilterInclusionMap} from '@/components/input/filter/type';
import {PokemonId, PokemonInfo} from '@/types/mongo/pokemon';
import {TeamAnalysis} from '@/ui/team/analysis/result/main';
import {TeamAnalysisSelectablePokemon} from '@/ui/team/analysis/selectable';
import {TeamAnalysisDataProps, TeamAnalysisFilter, TeamAnalysisTeamSetup} from '@/ui/team/analysis/type';
import {migrate} from '@/utils/migrate/main';
import {teamAnalysisSetupMigrators} from '@/utils/migrate/teamAnalysisSetup/migrators';


type Props = TeamAnalysisDataProps & {
  pokemon: PokemonInfo[],
  pokemonSelectableInclusionMap: FilterInclusionMap<PokemonId>,
  snorlaxFavorite: TeamAnalysisFilter['snorlaxFavorite'],
};

export const TeamAnalysisUI = (props: Props) => {
  const {pokemonSelectableInclusionMap, pokemon, session} = props;

  const [setup, setSetup] = React.useState<TeamAnalysisTeamSetup>(migrate({
    original: {
      team: {
        A: null,
        B: null,
        C: null,
        D: null,
        E: null,
      },
      bonus: {
        overall: 0,
        ingredient: 12,
      },
      version: 1,
    },
    override: session?.user.data.teamAnalysisSetup,
    migrators: teamAnalysisSetupMigrators,
  }));

  return (
    <>
      <div className="h-80 overflow-y-scroll md:h-60 lg:h-40">
        <TeamAnalysisSelectablePokemon
          setSetup={setSetup}
          isIncluded={pokemonSelectableInclusionMap}
          pokemon={pokemon}
        />
      </div>
      <AdsUnit/>
      <TeamAnalysis setup={setup} setSetup={setSetup} {...props}/>
    </>
  );
};
