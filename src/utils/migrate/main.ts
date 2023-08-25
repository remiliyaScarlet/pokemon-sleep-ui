import merge from 'lodash/merge';

import {Migratable, Migrate, MigrateOpts} from '@/types/migrate';


export const migrate: Migrate = <TMigratable extends Migratable, TParams>({
  original,
  override,
  migrators,
  migrateParams,
}: MigrateOpts<TMigratable, TParams>) => {
  let data: MigrateOpts<TMigratable, TParams>['original'] = merge(original, override);

  for (const singleMigrator of migrators.sort((a, b) => a.toVersion - b.toVersion)) {
    if ((override?.version ?? -1) >= singleMigrator.toVersion) {
      continue;
    }

    data = singleMigrator.migrate(data, migrateParams);
  }

  return {
    ...data,
    version: original.version,
  };
};
