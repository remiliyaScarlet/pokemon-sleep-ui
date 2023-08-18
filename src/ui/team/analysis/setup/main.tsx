import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {useProducingStats} from '@/ui/team/analysis/setup/hook';
import {TeamAnalysisGroupedSummary} from '@/ui/team/analysis/setup/summary/grouped/main';
import {TeamAnalysisSummary} from '@/ui/team/analysis/setup/summary/main';
import {TeamAnalysisTeamView} from '@/ui/team/analysis/setup/team/main';
import {TeamAnalysisUploadSetup} from '@/ui/team/analysis/setup/upload';
import {TeamAnalysisDataProps, TeamAnalysisFilter, TeamAnalysisTeamSetup} from '@/ui/team/analysis/type';


type Props = TeamAnalysisDataProps & {
  setup: TeamAnalysisTeamSetup,
  setSetup: React.Dispatch<React.SetStateAction<TeamAnalysisTeamSetup>>,
  snorlaxFavorite: TeamAnalysisFilter['snorlaxFavorite'],
};

export const TeamAnalysisSetupView = (props: Props) => {
  const {
    setup,
    setSetup,
    snorlaxRankData,
    snorlaxFavorite,
  } = props;

  const producingStats = useProducingStats(props);
  const {state, setState, showPokemon} = usePokemonLinkPopup();

  return (
    <>
      <PokemonLinkPopup state={state} setState={setState}/>
      <Flex direction="row" center wrap className="gap-1.5">
        <TeamAnalysisTeamView
          producingStats={producingStats}
          showPokemon={showPokemon}
          {...props}
        />
        <TeamAnalysisUploadSetup setup={setup} snorlaxFavorite={snorlaxFavorite}/>
        <AdsUnit/>
        <TeamAnalysisGroupedSummary grouped={producingStats.grouped}/>
        <TeamAnalysisSummary
          bonus={setup.bonus}
          setBonus={(bonus) => setSetup((original) => ({
            ...original,
            bonus,
          }))}
          stats={producingStats}
          snorlaxRankData={snorlaxRankData}
        />
        <AdsUnit/>
      </Flex>
    </>
  );
};
