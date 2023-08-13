import {DeepPartial} from '@/utils/type';


export type MigrateVersion = number;

export type Migratable = {
  version: MigrateVersion,
};

export type Migrator<TMigratable extends Migratable> = {
  toVersion: MigrateVersion,
  migrate: (old: TMigratable) => TMigratable,
};

export type MigrateOpts<TMigratable extends Migratable> = {
  original: TMigratable,
  override: DeepPartial<TMigratable> | undefined,
  migrators: Migrator<TMigratable>[],
};

export type Migrate = <TMigratable extends Migratable>(
  opts: MigrateOpts<TMigratable>
) => MigrateOpts<TMigratable>['original'];
