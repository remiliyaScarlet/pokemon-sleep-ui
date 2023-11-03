import React from 'react';

import {PokemonProducingStatsPopupContent} from '@/components/shared/pokemon/production/stats/main';
import {TeamAnalysisPokemonMemberConfig} from '@/ui/team/analysis/setup/pokemon/popup/config';
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
      <PokemonProducingStatsPopupContent
        rate={stats}
        settings={settings}
        calculatedSettings={stats.calculatedSettings}
        specialty={pokemon.specialty}
      />
    );
  }

  if (type === null) {
    return null;
  }

  throw new Error(`Unhandled Team Analysis Pokemon popup type [${type satisfies never}]`);
};
