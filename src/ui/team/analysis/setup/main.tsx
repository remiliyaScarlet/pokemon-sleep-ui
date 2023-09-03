import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {useEffectiveBonus} from '@/hooks/userData/settings';
import {UserSettings} from '@/types/userData/settings';
import {useProducingStats} from '@/ui/team/analysis/setup/hook';
import {TeamAnalysisGroupedSummary} from '@/ui/team/analysis/setup/summary/grouped/main';
import {TeamAnalysisSummary} from '@/ui/team/analysis/setup/summary/main';
import {TeamAnalysisTeamView} from '@/ui/team/analysis/setup/team/main';
import {TeamAnalysisFilledProps} from '@/ui/team/analysis/setup/team/type';
import {TeamAnalysisUploadSetup} from '@/ui/team/analysis/setup/upload';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';
import {DeepPartial} from '@/utils/type';


type Props = TeamAnalysisDataProps & Omit<TeamAnalysisFilledProps, 'showPokemon' | 'bonus'> & {
  settings: DeepPartial<UserSettings> | undefined,
};

export const TeamAnalysisSetupView = (props: Props) => {
  const {
    setup,
    snorlaxRankData,
    snorlaxFavorite,
    preloadedSettings,
    settings,
  } = props;

  const bonus = useEffectiveBonus({
    server: preloadedSettings,
    client: settings,
  });
  const statsOfTeam = useProducingStats({
    ...props,
    bonus,
  });
  const {state, setState, showPokemon} = usePokemonLinkPopup();

  return (
    <>
      <PokemonLinkPopup state={state} setState={setState}/>
      <Flex direction="col" className="gap-1.5">
        <TeamAnalysisTeamView
          showPokemon={showPokemon}
          statsOfTeam={statsOfTeam}
          bonus={bonus}
          {...props}
        />
        <TeamAnalysisUploadSetup setup={setup} snorlaxFavorite={snorlaxFavorite}/>
        <AdsUnit/>
        <TeamAnalysisGroupedSummary grouped={statsOfTeam.grouped} period="weekly"/>
        <TeamAnalysisSummary
          period="weekly"
          stats={statsOfTeam}
          snorlaxRankData={snorlaxRankData}
        />
        <AdsUnit/>
      </Flex>
    </>
  );
};
