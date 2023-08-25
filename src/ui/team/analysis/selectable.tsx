import React from 'react';

import {FilterInclusionMap} from '@/components/input/filter/type';
import {PokemonIconClickable} from '@/components/shared/pokemon/icon/clickable';
import {PokemonId, PokemonInfo} from '@/types/game/pokemon';
import {
  TeamAnalysisDataProps,
  TeamAnalysisMember,
  TeamAnalysisSlotName,
  teamAnalysisSlotName,
  TeamAnalysisTeamSetup,
} from '@/ui/team/analysis/type';
import {generateIngredientProductionAtLevels} from '@/utils/game/producing/ingredientChain';


type Props = TeamAnalysisDataProps & {
  setup: TeamAnalysisTeamSetup,
  setMember: (slot: TeamAnalysisSlotName, member: TeamAnalysisMember) => void,
  isIncluded: FilterInclusionMap<PokemonId>,
  pokemon: PokemonInfo[],
};

export const TeamAnalysisSelectablePokemon = ({
  setup,
  setMember,
  isIncluded,
  pokemon,
  pokedex,
  ingredientChainMap,
}: Props) => {
  const putOnTeam = (id: PokemonId) => {
    let slotToInsert: TeamAnalysisSlotName | null = null;

    for (const slotName of teamAnalysisSlotName) {
      if (setup.team[slotName]) {
        continue;
      }
      slotToInsert = slotName;
      break;
    }

    const pokemon = pokedex[id];
    if (!pokemon) {
      return;
    }

    const chain = ingredientChainMap[pokemon.ingredientChain];

    setMember(
      slotToInsert ?? 'E',
      {
        pokemonId: id,
        level: 1,
        nature: null,
        subSkill: {},
        ingredients: generateIngredientProductionAtLevels(chain),
      },
    );
  };

  return <PokemonIconClickable pokemon={pokemon.filter(({id}) => isIncluded[id])} onClick={putOnTeam}/>;
};
