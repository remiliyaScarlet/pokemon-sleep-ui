import React from 'react';

import {FilterInclusionMap} from '@/components/input/filter/type';
import {PokemonIconClickable} from '@/components/shared/pokemon/icon/clickable';
import {PokemonId, PokemonInfo} from '@/types/mongo/pokemon';
import {
  TeamAnalysisMember,
  TeamAnalysisSlotName,
  teamAnalysisSlotName,
  TeamAnalysisTeamSetup,
} from '@/ui/team/analysis/type';


type Props = {
  setup: TeamAnalysisTeamSetup,
  setMember: (slot: TeamAnalysisSlotName, member: TeamAnalysisMember) => void,
  isIncluded: FilterInclusionMap<PokemonId>,
  pokemon: PokemonInfo[],
};

export const TeamAnalysisSelectablePokemon = ({setup, setMember, isIncluded, pokemon}: Props) => {
  const putOnTeam = (id: PokemonId) => {
    let slotToInsert: TeamAnalysisSlotName | null = null;

    for (const slotName of teamAnalysisSlotName) {
      if (setup.team[slotName]) {
        continue;
      }
      slotToInsert = slotName;
      break;
    }

    setMember(
      slotToInsert ?? 'E',
      {
        pokemonId: id,
        level: 1,
        nature: null,
        subSkill: {},
      },
    );
  };

  return <PokemonIconClickable pokemon={pokemon.filter(({id}) => isIncluded[id])} onClick={putOnTeam}/>;
};
