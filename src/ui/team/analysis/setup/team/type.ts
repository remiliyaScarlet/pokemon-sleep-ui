import React from 'react';

import {EffectiveBonus} from '@/types/game/bonus';
import {PokemonInfo} from '@/types/game/pokemon';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {TeamProducingStatsSingle} from '@/ui/team/analysis/setup/type';
import {TeamAnalysisMember, TeamAnalysisSlotName, TeamAnalysisTeamSetup} from '@/ui/team/analysis/type';


export type TeamAnalysisFilledProps = {
  setup: TeamAnalysisTeamSetup,
  setSetup: React.Dispatch<React.SetStateAction<TeamAnalysisTeamSetup>>,
  snorlaxFavorite: SnorlaxFavorite,
  bonus: EffectiveBonus,
  showPokemon: (pokemon: PokemonInfo) => void,
};

export type TeamAnalysisFilledSlotProps = TeamAnalysisFilledProps & {
  slotName: TeamAnalysisSlotName,
  member: TeamAnalysisMember,
  pokemon: PokemonInfo,
  stats: TeamProducingStatsSingle,
};
