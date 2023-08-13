import {Migrator} from '@/types/migrate';
import {TeamAnalysisMember, TeamAnalysisSlotName, TeamAnalysisTeamSetup} from '@/ui/team/analysis/type';


export const teamAnalysisSetupMigrators: Migrator<TeamAnalysisTeamSetup>[] = [
  {
    toVersion: 1,
    migrate: (old) => ({
      ...old,
      team: Object.fromEntries(Object.entries(old.team).map(([slot, member]) => {
        if (!member) {
          return [slot, null];
        }

        return [slot as TeamAnalysisSlotName, {...member, subSkill: {}} satisfies TeamAnalysisMember];
      })) as TeamAnalysisTeamSetup['team'],
    }),
  },
];
