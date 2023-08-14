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
  setSetup: React.Dispatch<React.SetStateAction<TeamAnalysisTeamSetup>>,
  isIncluded: FilterInclusionMap<PokemonId>,
  pokemon: PokemonInfo[],
};

export const TeamAnalysisSelectablePokemon = ({setSetup, isIncluded, pokemon}: Props) => {
  const putOnTeam = (id: PokemonId) => {
    setSetup((original) => {
      let slotToInsert: TeamAnalysisSlotName | null = null;

      for (const slotName of teamAnalysisSlotName) {
        if (original.team[slotName]) {
          continue;
        }
        slotToInsert = slotName;
        break;
      }

      return {
        ...original,
        team: {
          ...original.team,
          [slotToInsert ?? 'E']: {
            pokemonId: id,
            level: 1,
            nature: null,
            subSkill: {},
          } satisfies TeamAnalysisMember,
        },
      };
    });
  };

  return <PokemonIconClickable pokemon={pokemon.filter(({id}) => isIncluded[id])} onClick={putOnTeam}/>;
};
