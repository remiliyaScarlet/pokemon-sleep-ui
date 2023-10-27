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

export const toCalculatedUserSettings = (opts: ToEffectiveBonusOpts): CalculatedUserSettings => {
  const {settings} = opts;

  return {
    bonus: toEffectiveBonus(opts),
    sleepDurations: getSleepDurationsFromSleepSession(settings.stamina.sleepSession),
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
