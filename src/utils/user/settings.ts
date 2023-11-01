import {defaultUserSettings} from '@/const/user/settings';
import {StaminaRecoveryRateConfig} from '@/types/game/stamina/config';
import {CalculatedUserSettings, UserSettings} from '@/types/userData/settings';
import {getSleepDurationsFromSleepSession} from '@/utils/game/sleep';
import {cloneMerge} from '@/utils/object/cloneMerge';
import {DeepPartial} from '@/utils/type';
import {toEffectiveBonus, ToEffectiveBonusOpts} from '@/utils/user/bonus';


export const createUserSettings = (settings: DeepPartial<UserSettings> | undefined): UserSettings => {
  return cloneMerge(defaultUserSettings, settings);
};

type ToCalculatedUserSettingsOpts = ToEffectiveBonusOpts & {
  recoveryRate?: StaminaRecoveryRateConfig,
};

export const toCalculatedUserSettings = ({
  recoveryRate,
  settings,
  ...opts
}: ToCalculatedUserSettingsOpts): CalculatedUserSettings => {
  if (recoveryRate) {
    settings = overrideRecoveryRate({settings, recoveryRate});
  }

  return {
    bonus: toEffectiveBonus({settings, ...opts}),
    sleepDurations: getSleepDurationsFromSleepSession(settings.stamina.sleepSession),
    behavior: settings.behavior,
  };
};

type OverrideRecoveryRateOpts = {
  settings: UserSettings,
  recoveryRate: StaminaRecoveryRateConfig,
};

export const overrideRecoveryRate = ({
  settings,
  recoveryRate,
}: OverrideRecoveryRateOpts): UserSettings => {
  return {
    ...settings,
    stamina: {
      ...settings.stamina,
      recoveryRate,
    },
  };
};
