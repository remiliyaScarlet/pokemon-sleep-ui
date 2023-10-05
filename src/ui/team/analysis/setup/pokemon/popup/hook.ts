import React from 'react';

import {TeamAnalysisPokemonPopupState} from '@/ui/team/analysis/setup/pokemon/popup/type';
import {TeamAnalysisPokemonPopupType} from '@/ui/team/analysis/setup/pokemon/type';


export const useTeamAnalysisPokemonPopup = () => {
  const [control, setControl] = React.useState<TeamAnalysisPokemonPopupState>({
    type: null,
    show: false,
  });

  return {
    control,
    show: (type: TeamAnalysisPokemonPopupType) => setControl({
      type,
      show: true,
    }),
    hide: () => setControl((original) => ({
      ...original,
      show: false,
    })),
  };
};
