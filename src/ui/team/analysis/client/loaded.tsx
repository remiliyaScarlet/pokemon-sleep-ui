import React from 'react';

import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon';
import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';

import {AdsUnit} from '@/components/ads/main';
import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Collapsible} from '@/components/layout/collapsible/main';
import {Flex} from '@/components/layout/flex';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {useTeamAnalysisPokemonFilter} from '@/ui/team/analysis/hook';
import {TeamAnalysisPokemonFilter} from '@/ui/team/analysis/input/main';
import {TeamAnalysisSnorlaxFavorite} from '@/ui/team/analysis/input/snorlaxFavorite';
import {TeamAnalysisSelectablePokemon} from '@/ui/team/analysis/selectable';
import {TeamAnalysisSetupView} from '@/ui/team/analysis/setup/main';
import {TeamAnalysisDataProps, TeamAnalysisTeamSetup} from '@/ui/team/analysis/type';
import {migrate} from '@/utils/migrate/main';
import {teamAnalysisSetupMigrators} from '@/utils/migrate/teamAnalysisSetup/migrators';
import {isNotNullish} from '@/utils/type';


export const TeamAnalysisLoadedClient = (props: TeamAnalysisDataProps) => {
  const {pokedex, preloadedSetup} = props;
  const pokemon = Object.values(pokedex).filter(isNotNullish);

  const {filter, setFilter, isIncluded} = useTeamAnalysisPokemonFilter({
    data: pokemon,
    snorlaxFavorite: preloadedSetup?.snorlaxFavorite,
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
      bonus: {
        overall: 125,
        ingredient: 20,
      },
      version: 1,
    },
    override: preloadedSetup ?? {},
    migrators: teamAnalysisSetupMigrators,
  }));
  const filterCollapsible = useCollapsible();
  const pickerCollapsible = useCollapsible();

  React.useEffect(() => {
    pickerCollapsible.setShow(true);
  }, [filter]);

  return (
    <>
      <Collapsible state={filterCollapsible} className="h-[25vh]" button={
        <Flex direction="row" center className="gap-0.5">
          <GenericPokeballIcon alt="Pokemon" dimension="h-6 w-6"/>
          <div className="h-6 w-6">
            <PlusCircleIcon/>
          </div>
          <div className="h-6 w-6">
            <FunnelIcon/>
          </div>
        </Flex>
      }>
        <TeamAnalysisPokemonFilter filter={filter} setFilter={setFilter} pokemon={pokemon}/>
      </Collapsible>
      <Collapsible state={pickerCollapsible} className="h-[25vh]" button={
        <Flex direction="row" center className="gap-0.5">
          <GenericPokeballIcon alt="Pokemon" dimension="h-6 w-6"/>
          <div className="h-6 w-6">
            <PlusCircleIcon/>
          </div>
        </Flex>
      }>
        <TeamAnalysisSelectablePokemon
          setSetup={setSetup}
          isIncluded={isIncluded}
          pokemon={pokemon}
        />
      </Collapsible>
      <AdsUnit/>
      <TeamAnalysisSnorlaxFavorite filter={filter} setFilter={setFilter} pokemon={pokemon} {...props}/>
      <TeamAnalysisSetupView setup={setup} setSetup={setSetup} snorlaxFavorite={filter.snorlaxFavorite} {...props}/>
    </>
  );
};
