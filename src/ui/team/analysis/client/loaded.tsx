import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex';
import {SnorlaxFavoriteInput} from '@/components/shared/snorlax/favorite';
import {UserSettings} from '@/types/userData/settings';
import {useTeamAnalysisPokemonFilter} from '@/ui/team/analysis/hook';
import {TeamAnalysisPokemonFilter} from '@/ui/team/analysis/input/main';
import {TeamAnalysisSetupView} from '@/ui/team/analysis/setup/main';
import {TeamAnalysisDataProps, TeamAnalysisTeamSetup} from '@/ui/team/analysis/type';
import {migrate} from '@/utils/migrate/main';
import {teamAnalysisSetupMigrators} from '@/utils/migrate/teamAnalysisSetup/migrators';
import {DeepPartial, isNotNullish} from '@/utils/type';


type Props = TeamAnalysisDataProps & {
  settings: DeepPartial<UserSettings> | undefined,
};

export const TeamAnalysisLoadedClient = (props: Props) => {
  const {
    pokedex,
    preloadedSetup,
    ingredientChainMap,
  } = props;
  const pokemon = Object.values(pokedex).filter(isNotNullish);

  const {filter, setFilter, isIncluded} = useTeamAnalysisPokemonFilter({
    data: pokemon,
    snorlaxFavorite: preloadedSetup?.snorlaxFavorite,
    ...props,
  });
  const [setup, setSetup] = React.useState<TeamAnalysisTeamSetup>(migrate({
    original: {
      team: {
        A: null,
        B: null,
        C: null,
        D: null,
        E: null,
      },
      version: 2,
    },
    override: preloadedSetup ?? {},
    migrators: teamAnalysisSetupMigrators,
    migrateParams: {pokedex, ingredientChainMap},
  }));

  return (
    <>
      <TeamAnalysisPokemonFilter
        pokemonList={pokemon}
        setup={setup}
        setSetup={setSetup}
        isIncluded={isIncluded}
        filter={filter}
        setFilter={setFilter}
        {...props}
      />
      <AdsUnit/>
      <Flex direction="col" className="gap-1">
        <SnorlaxFavoriteInput
          filter={filter}
          setFilter={setFilter}
          filterKey="snorlaxFavorite"
          pokemonList={pokemon}
          {...props}
        />
      </Flex>
      <TeamAnalysisSetupView
        setup={setup}
        setSetup={setSetup}
        snorlaxFavorite={filter.snorlaxFavorite}
        {...props}
      />
    </>
  );
};
