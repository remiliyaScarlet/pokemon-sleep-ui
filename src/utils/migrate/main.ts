import {Migratable, MigrateOpts} from '@/types/migrate';
import {cloneMerge} from '@/utils/object';


export const migrate = <TMigratable extends Migratable, TParams>({
  original,
  override,
  migrators,
  migrateParams,
}: MigrateOpts<TMigratable, TParams>) => {
  if (override === null) {
    // No need for migration if `override` is `null` because it will be just `original`,
    // which is always the latest version
    return original;
  }

  let data: MigrateOpts<TMigratable, TParams>['original'] = cloneMerge(original, override);

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
  } satisfies MigrateOpts<TMigratable, TParams>['original'];
};
