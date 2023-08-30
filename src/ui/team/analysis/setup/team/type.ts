import React from 'react';

import {PokemonInfo} from '@/types/game/pokemon';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {TeamAnalysisTeamSetup} from '@/ui/team/analysis/type';


export type TeamAnalysisFilledSlotProps = {
  setup: TeamAnalysisTeamSetup,
  setSetup: React.Dispatch<React.SetStateAction<TeamAnalysisTeamSetup>>,
  snorlaxFavorite: SnorlaxFavorite,
  showPokemon: (pokemon: PokemonInfo) => void,
};
