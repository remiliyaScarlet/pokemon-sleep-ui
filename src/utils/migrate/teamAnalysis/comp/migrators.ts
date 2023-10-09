import {Migrator} from '@/types/migrate';
import {TeamAnalysisComp} from '@/types/teamAnalysis';
import {TeamAnalysisCompMigrateParams} from '@/utils/migrate/teamAnalysis/comp/type';


export const teamAnalysisCompMigrators: Migrator<TeamAnalysisComp, TeamAnalysisCompMigrateParams>[] = [
  {
    // no-op, simply add a version number
    toVersion: 1,
    migrate: (old) => old,
  },
];
