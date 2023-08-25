import {Migrator} from '@/types/migrate';
import {TeamAnalysisMember, teamAnalysisSlotName, TeamAnalysisTeamSetup} from '@/ui/team/analysis/type';


export const teamAnalysisSetupMigrators: Migrator<TeamAnalysisTeamSetup>[] = [
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
];
