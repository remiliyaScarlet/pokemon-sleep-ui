import React from 'react';

import {EffectiveBonus} from '@/types/game/bonus';
import {PokemonInfo} from '@/types/game/pokemon';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {TeamProducingStatsSingle} from '@/ui/team/analysis/setup/type';
import {TeamAnalysisMember, TeamAnalysisSlotName, TeamAnalysisSetup} from '@/ui/team/analysis/type';


export type TeamAnalysisFilledProps = {
  setup: TeamAnalysisSetup,
  setSetup: React.Dispatch<React.SetStateAction<TeamAnalysisSetup>>,
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
