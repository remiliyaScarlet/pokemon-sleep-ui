import {v4} from 'uuid';

import {Migrator} from '@/types/migrate';
import {
  TeamAnalysisMember,
  TeamAnalysisSetup,
  TeamAnalysisSingleTeam,
  teamAnalysisSlotName,
} from '@/types/teamAnalysis';
import {getDefaultTeamName} from '@/ui/team/analysis/utils';
import {getEvolutionCountFromPokemonInfo} from '@/utils/game/pokemon';
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
    // @ts-ignore
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
  {
    // Move `snorlaxFavorite` to team-comp dependent
    toVersion: 4,
    migrate: (old) => ({
      ...old,
      teams: Object.fromEntries(Object.values(old.teams).map((team) => [
        team.uuid,
        {
          ...team,
          snorlaxFavorite: {},
        } satisfies TeamAnalysisSingleTeam,
      ])),
    }),
  },
  {
    // `carryLimit` addition
    toVersion: 5,
    migrate: (old, {pokedex}) => ({
      ...old,
      teams: Object.fromEntries(Object.values(old.teams).map((team) => {
        const updatedMembers = Object.fromEntries(teamAnalysisSlotName.map((slot) => {
          const member = team.members[slot];
          if (!member) {
            return [slot, null];
          }

          const pokemon = pokedex[member.pokemonId];
          if (!pokemon) {
            return [slot, null];
          }

          return [
            slot,
            // @ts-ignore
            {...member, carryLimit: pokemon.stats.maxCarry} satisfies TeamAnalysisMember,
          ];
        })) as TeamAnalysisSingleTeam['members'];

        return [team.uuid, {...team, members: updatedMembers} satisfies TeamAnalysisSingleTeam];
      })),
    }),
  },
  {
    // `carryLimit` to `evolutionCount`
    toVersion: 6,
    migrate: (old, {pokedex}) => ({
      ...old,
      teams: Object.fromEntries(Object.values(old.teams).map((team) => {
        const updatedMembers = Object.fromEntries(teamAnalysisSlotName.map((slot) => {
          const member = team.members[slot];
          if (!member) {
            return [slot, null];
          }

          const pokemon = pokedex[member.pokemonId];
          if (!pokemon) {
            return [slot, null];
          }

          return [
            slot,
            {...member, evolutionCount: getEvolutionCountFromPokemonInfo({pokemon})} satisfies TeamAnalysisMember,
          ];
        })) as TeamAnalysisSingleTeam['members'];

        return [team.uuid, {...team, members: updatedMembers} satisfies TeamAnalysisSingleTeam];
      })),
    }),
  },
  {
    // `analysisPeriod` addition
    toVersion: 7,
    migrate: (old) => ({
      ...old,
      teams: Object.fromEntries(Object.values(old.teams).map((team) => [
        team.uuid,
        {
          ...team,
          analysisPeriod: 'daily',
        } satisfies TeamAnalysisSingleTeam,
      ])),
    }),
  },
];
