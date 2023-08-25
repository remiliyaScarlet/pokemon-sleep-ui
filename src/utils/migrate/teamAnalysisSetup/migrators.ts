import {Migrator} from '@/types/migrate';
import {TeamAnalysisMember, teamAnalysisSlotName, TeamAnalysisTeamSetup} from '@/ui/team/analysis/type';
import {generateIngredientProductionAtLevels} from '@/utils/game/producing/ingredientChain';
import {TeamAnalysisMigrateParams} from '@/utils/migrate/teamAnalysisSetup/type';


export const teamAnalysisSetupMigrators: Migrator<TeamAnalysisTeamSetup, TeamAnalysisMigrateParams>[] = [
  {
    toVersion: 1,
    migrate: (old) => ({
      ...old,
      team: Object.fromEntries(teamAnalysisSlotName.map((slot) => {
        const member = old.team[slot];

        if (!member) {
          return [slot, null];
        }

        return [slot, {...member, subSkill: {}} satisfies TeamAnalysisMember];
      })) as TeamAnalysisTeamSetup['team'],
    }),
  },
  {
    toVersion: 2,
    migrate: (old, {pokedex, ingredientChainMap}) => ({
      ...old,
      team: Object.fromEntries(teamAnalysisSlotName.map((slot) => {
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
      })) as TeamAnalysisTeamSetup['team'],
    }),
  },
];
