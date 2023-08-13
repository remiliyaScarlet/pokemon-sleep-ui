import merge from 'lodash/merge';

import {Migratable, Migrate, MigrateOpts} from '@/types/migrate';


export const migrate: Migrate = <TMigratable extends Migratable>({
  original,
  override,
  migrators,
}: MigrateOpts<TMigratable>) => {
  let data: MigrateOpts<TMigratable>['original'] = merge(original, override);

  for (const singleMigrator of migrators.sort((a, b) => a.toVersion - b.toVersion)) {
    if ((override?.version ?? -1) >= singleMigrator.toVersion) {
      continue;
    }

    data = singleMigrator.migrate(data);
  }

  return {
    ...data,
    version: original.version,
  };
};
