import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {useUserSettings} from '@/hooks/userData/settings';
import {UserSettings} from '@/types/userData/settings';
import {TeamAnalysisSetupControl} from '@/ui/team/analysis/setup/control';
import {useProducingStats} from '@/ui/team/analysis/setup/hook';
import {TeamAnalysisGroupedSummary} from '@/ui/team/analysis/setup/summary/grouped/main';
import {TeamAnalysisSummary} from '@/ui/team/analysis/setup/summary/main';
import {TeamAnalysisTeamView} from '@/ui/team/analysis/setup/team/main';
import {TeamAnalysisFilledProps} from '@/ui/team/analysis/setup/team/type';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';
import {DeepPartial} from '@/utils/type';


type Props = TeamAnalysisDataProps & Omit<TeamAnalysisFilledProps, 'showPokemon' | 'calculatedSettings'> & {
  settings: DeepPartial<UserSettings> | undefined,
};

export const TeamAnalysisSetupView = (props: Props) => {
  const {
    setup,
    setSetup,
    snorlaxRankData,
    preloadedSettings,
    settings,
  } = props;

  const calculatedSettings = useUserSettings({
    server: preloadedSettings,
    client: settings,
  });
  const statsOfTeam = useProducingStats({
    ...props,
    calculatedSettings,
  });
  const {state, setState, showPokemon} = usePokemonLinkPopup();

  return (
    <>
      <PokemonLinkPopup state={state} setState={setState}/>
      <Flex className="gap-1.5">
        <TeamAnalysisTeamView
          showPokemon={showPokemon}
          statsOfTeam={statsOfTeam}
          calculatedSettings={calculatedSettings}
          {...props}
        />
        <TeamAnalysisSetupControl setup={setup} setSetup={setSetup}/>
        <AdsUnit/>
        <TeamAnalysisGroupedSummary grouped={statsOfTeam.grouped}/>
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
