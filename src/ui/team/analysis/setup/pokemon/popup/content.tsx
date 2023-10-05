import React from 'react';

import {TeamAnalysisPokemonMemberConfig} from '@/ui/team/analysis/setup/pokemon/config';
import {TeamAnalysisPokemonPopupCommonProps} from '@/ui/team/analysis/setup/pokemon/popup/type';


export const TeamAnalysisPokemonPopupContent = ({
  state,
  ratingControl,
  ...props
}: TeamAnalysisPokemonPopupCommonProps) => {
  const {type} = state.control;

  if (type === 'memberConfig') {
    return <TeamAnalysisPokemonMemberConfig {...props}/>;
  }

  if (type === 'detailedStats') {
    return <></>;
  }

  if (type === null) {
    return <></>;
  }

  throw new Error(`Unhandled Team Analysis Pokemon popup type [${type satisfies never}]`);
};
