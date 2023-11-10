import {
  defaultRecoveryRate,
  defaultStaminaCalcConfig,
  defaultStaminaSkillTrigger,
  defaultUserCalculationBehavior,
} from '@/const/user/settings';
import {Migrator} from '@/types/migrate';
import {UserSettings} from '@/types/userData/settings';
import {UserSettingsMigrateParams} from '@/utils/migrate/userSettings/type';


export const userSettingsMigrators: Migrator<UserSettings, UserSettingsMigrateParams>[] = [
  {
    toVersion: 1,
    // no-op, simply add a version number
    migrate: (old) => old,
  },
  {
    toVersion: 2,
    // Added stamina config
    migrate: (old) => ({...old, stamina: defaultStaminaCalcConfig}),
  },
  {
    toVersion: 3,
    // Added `recoveryRate` in `StaminaCalcConfig`
    migrate: (old) => ({
      ...old,
      stamina: {
        ...old.stamina,
        recoveryRate: defaultRecoveryRate,
      },
    }),
  },
  {
    toVersion: 4,
    // Added `staminaSkillTrigger` in the config
    migrate: (old) => ({
      ...old,
      staminaSkillTrigger: defaultStaminaSkillTrigger,
    }),
  },
  {
    toVersion: 5,
    // Added `staminaSkillTrigger` in the config
    migrate: (old) => ({
      ...old,
      behavior: defaultUserCalculationBehavior,
    }),
  },
  {
    toVersion: 6,
    // Added `staminaSkillTrigger` in the config
    migrate: (old) => ({
      ...old,
      behavior: {
        ...old.behavior,
        ...defaultUserCalculationBehavior,
        // @ts-ignore
        alwaysFullPack: old.behavior.berryPokemonAlwaysFullPack ? 'berryOnly' : 'disable',
      },
    }),
  },
];
