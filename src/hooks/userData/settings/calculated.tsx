import isEqual from 'lodash/isEqual';
import {useCustomCompareMemo} from 'use-custom-compare';

import {useUserSettings} from '@/hooks/userData/settings/main';
import {UseUserSettingsOpts} from '@/hooks/userData/settings/type';
import {CalculatedUserSettings} from '@/types/userData/settings';
import {getSleepDurationsFromSleepSession} from '@/utils/game/sleep';
import {toEffectiveBonus} from '@/utils/user/settings';


export const useCalculatedUserSettings = (opts: UseUserSettingsOpts): CalculatedUserSettings => {
  const settings = useUserSettings(opts);

  return useCustomCompareMemo(
    () => ({
      bonus: toEffectiveBonus({settings}),
      sleepDurations: getSleepDurationsFromSleepSession(settings.stamina.sleepSession),
    }),
    [settings],
    (prev, next) => isEqual(prev, next),
  );
};
