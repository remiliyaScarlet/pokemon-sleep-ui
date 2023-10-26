import {defaultUserSettings} from '@/const/user/settings';
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
