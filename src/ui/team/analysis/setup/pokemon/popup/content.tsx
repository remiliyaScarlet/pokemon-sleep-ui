import React from 'react';

import {PokemonProducingStats} from '@/components/shared/pokemon/production/stats/main';
import {TeamAnalysisPokemonMemberConfig} from '@/ui/team/analysis/setup/pokemon/config';
import {TeamAnalysisPokemonPopupCommonProps} from '@/ui/team/analysis/setup/pokemon/popup/type';


export const TeamAnalysisPokemonPopupContent = ({
  state,
  ...props
}: TeamAnalysisPokemonPopupCommonProps) => {
  const {
    stats,
    pokemon,
    calculatedSettings,
  } = props;
  const {type} = state.control;

  if (type === 'memberConfig') {
    return <TeamAnalysisPokemonMemberConfig {...props}/>;
  }

  if (type === 'detailedStats') {
    return <PokemonProducingStats rate={stats} bonus={calculatedSettings.bonus} specialty={pokemon.specialty}/>;
  }

  if (type === null) {
    return <></>;
  }

  throw new Error(`Unhandled Team Analysis Pokemon popup type [${type satisfies never}]`);
};
