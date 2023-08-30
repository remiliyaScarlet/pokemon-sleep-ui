import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {useProducingStats} from '@/ui/team/analysis/setup/hook';
import {TeamAnalysisGroupedSummary} from '@/ui/team/analysis/setup/summary/grouped/main';
import {TeamAnalysisSummary} from '@/ui/team/analysis/setup/summary/main';
import {TeamAnalysisTeamView} from '@/ui/team/analysis/setup/team/main';
import {TeamAnalysisFilledSlotProps} from '@/ui/team/analysis/setup/team/type';
import {TeamAnalysisUploadSetup} from '@/ui/team/analysis/setup/upload';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';


type Props = TeamAnalysisDataProps & Omit<TeamAnalysisFilledSlotProps, 'showPokemon'>;

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
      <Flex direction="col" className="gap-1.5">
        <TeamAnalysisTeamView
          producingStats={producingStats}
          showPokemon={showPokemon}
          {...props}
        />
        <TeamAnalysisUploadSetup setup={setup} snorlaxFavorite={snorlaxFavorite}/>
        <AdsUnit/>
        <TeamAnalysisGroupedSummary grouped={producingStats.grouped} period="weekly"/>
        <TeamAnalysisSummary
          bonus={setup.bonus}
          setBonus={(bonus) => setSetup((original) => ({
            ...original,
            bonus,
          }))}
          period="weekly"
          stats={producingStats}
          snorlaxRankData={snorlaxRankData}
        />
        <AdsUnit/>
      </Flex>
    </>
  );
};
