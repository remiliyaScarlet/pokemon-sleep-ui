import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PokemonProducingStats} from '@/components/shared/pokemon/production/stats/main';
import {TeamAnalysisPokemonMemberConfig} from '@/ui/team/analysis/setup/pokemon/config';
import {TeamAnalysisPokemonPopupCommonProps} from '@/ui/team/analysis/setup/pokemon/popup/type';


export const TeamAnalysisPokemonPopupContent = ({
  state,
  ...props
}: TeamAnalysisPokemonPopupCommonProps) => {
  const {
    stats,
    settings,
    pokemon,
  } = props;
  const {type} = state.control;

  if (type === 'memberConfig') {
    return <TeamAnalysisPokemonMemberConfig {...props}/>;
  }

  if (type === 'detailedStats') {
    return (
      <Flex noFullWidth className="gap-1 sm:w-[60vw] lg:w-[50vw] 2xl:w-[40vw]">
        <PokemonProducingStats
          rate={stats}
          settings={settings}
          calculatedSettings={stats.calculatedSettings}
          specialty={pokemon.specialty}
        />
      </Flex>
    );
  }

  if (type === null) {
    return null;
  }

  throw new Error(`Unhandled Team Analysis Pokemon popup type [${type satisfies never}]`);
};
