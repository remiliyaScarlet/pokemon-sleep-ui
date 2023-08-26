import {DeepPartial} from '@/utils/type';


export type MigrateVersion = number;

export type Migratable = {
  version: MigrateVersion,
};

export type Migrator<TMigratable extends Migratable, TParams> = {
  toVersion: MigrateVersion,
  migrate: (old: TMigratable, params: TParams) => TMigratable,
};

export type MigrateOpts<TMigratable extends Migratable, TParams> = {
  original: TMigratable,
  override: DeepPartial<TMigratable> | null,
  migrators: Migrator<TMigratable, TParams>[],
  migrateParams: TParams,
};

export type MigrateCall = <TMigratable extends Migratable, TParams>(
  opts: MigrateOpts<TMigratable, TParams>
) => MigrateOpts<TMigratable, TParams>['original'];
