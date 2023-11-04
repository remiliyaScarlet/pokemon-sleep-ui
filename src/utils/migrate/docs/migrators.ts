import {Migrator} from '@/types/migrate';
import {DocsData} from '@/types/mongo/docs';
import {DocsMigrateParams} from '@/utils/migrate/docs/type';


export const docsMigrators: Migrator<DocsData, DocsMigrateParams>[] = [
  {
    // no-op, simply add a version number
    toVersion: 1,
    migrate: (old) => old,
  },
];
