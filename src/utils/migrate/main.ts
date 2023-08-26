import merge from 'lodash/merge';

import {Migratable, MigrateCall, MigrateOpts} from '@/types/migrate';


export const migrate: MigrateCall = <TMigratable extends Migratable, TParams>({
  original,
  override,
  migrators,
  migrateParams,
}: MigrateOpts<TMigratable, TParams>) => {
  // Has to have an empty object first, or `original` will be modified
  // https://stackoverflow.com/a/28044419/11571888
  let data: MigrateOpts<TMigratable, TParams>['original'] = merge({}, original, override);

  for (const singleMigrator of migrators.sort((a, b) => a.toVersion - b.toVersion)) {
    if ((override?.version ?? -1) >= singleMigrator.toVersion) {
      continue;
    }

    data = singleMigrator.migrate(data, migrateParams);
  }

  return {
    ...data,
    // Force-write the version info from `original` - otherwise, version could be overwritten by `override`
    version: original.version,
  };
};
