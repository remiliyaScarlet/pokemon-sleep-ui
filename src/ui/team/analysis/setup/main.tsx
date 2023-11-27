import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {useUserSettingsBundle} from '@/hooks/userData/bundle';
import {UserSettingsBundle} from '@/types/userData/settings';
import {useTeamProducingStats} from '@/ui/team/analysis/calcHook/main';
import {TeamAnalysisSetupControl} from '@/ui/team/analysis/setup/control';
import {TeamAnalysisGroupedSummary} from '@/ui/team/analysis/setup/summary/grouped/main';
import {TeamAnalysisSummary} from '@/ui/team/analysis/setup/summary/main';
import {TeamAnalysisTeamView} from '@/ui/team/analysis/setup/team/main';
import {TeamAnalysisFilledProps} from '@/ui/team/analysis/setup/team/type';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';
import {DeepPartial} from '@/utils/type';


type Props = TeamAnalysisDataProps & Omit<TeamAnalysisFilledProps, 'showPokemon' | 'bundle'> & {
  bundleFromClient: DeepPartial<UserSettingsBundle> | undefined,
};

export const TeamAnalysisSetupView = (props: Props) => {
  const {
    setup,
    setSetup,
    snorlaxRankData,
    preloaded,
    bundleFromClient,
  } = props;

  const bundle = useUserSettingsBundle({
    bundle: {
      server: preloaded,
      client: bundleFromClient,
    },
  });
  const statsOfTeam = useTeamProducingStats({
    ...props,
    bundle,
  });
  const {state, setState, showPokemon} = usePokemonLinkPopup();

  return (
    <>
      <PokemonLinkPopup state={state} setState={setState}/>
      <Flex className="gap-1.5">
        <TeamAnalysisTeamView
          {...props}
          showPokemon={showPokemon}
          statsOfTeam={statsOfTeam}
          bundle={bundle}
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
