import {v4} from 'uuid';

import {Migrator} from '@/types/migrate';
import {TeamAnalysisMember, TeamAnalysisSetup, teamAnalysisSlotName} from '@/ui/team/analysis/type';
import {getDefaultTeamName} from '@/ui/team/analysis/utils';
import {generateIngredientProductionAtLevels} from '@/utils/game/producing/ingredientChain';
import {TeamAnalysisMigrateParams} from '@/utils/migrate/teamAnalysisSetup/type';


export const teamAnalysisSetupMigrators: Migrator<TeamAnalysisSetup, TeamAnalysisMigrateParams>[] = [
  {
    // Subskill addition
    toVersion: 1,
    migrate: (old) => ({
      ...old,
      team: Object.fromEntries(teamAnalysisSlotName.map((slot) => {
        // @ts-ignore
        const member = old.team[slot];

        if (!member) {
          return [slot, null];
        }

        return [slot, {...member, subSkill: {}} satisfies TeamAnalysisMember];
        // @ts-ignore
      })) as TeamAnalysisSetup['team'],
    }),
  },
  {
    // Ingredient chain addition
    toVersion: 2,
    migrate: (old, {pokedex, ingredientChainMap}) => ({
      ...old,
      team: Object.fromEntries(teamAnalysisSlotName.map((slot) => {
        // @ts-ignore
        const member = old.team[slot];
        if (!member) {
          return [slot, null];
        }

        const pokemon = pokedex[member.pokemonId];
        if (!pokemon) {
          return [slot, null];
        }

        const chain = ingredientChainMap[pokemon.ingredientChain];

        return [
          slot,
          {...member, ingredients: generateIngredientProductionAtLevels(chain)} satisfies TeamAnalysisMember,
        ];
        // @ts-ignore
      })) as TeamAnalysisSetup['team'],
    }),
  },
  {
    // Multi-comp addition
    toVersion: 3,
    migrate: (old) => {
      const uuid = v4();

      return {
        version: 3,
        current: uuid,
        teams: {
          [uuid]: {
            uuid,
            name: getDefaultTeamName(uuid),
            // @ts-ignore
            members: old.team,
          },
        },
      };
    },
  },
];
