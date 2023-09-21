import isEqual from 'lodash/isEqual';
import {useCustomCompareMemo} from 'use-custom-compare';

import {CalculatedUserSettings, UserSettings} from '@/types/userData/settings';
import {getNoCollectDurationsFromSleepSession} from '@/utils/game/sleep';
import {cloneMerge} from '@/utils/object';
import {DeepPartial} from '@/utils/type';
import {toEffectiveBonus} from '@/utils/user/settings';


type UseUserSettingsOpts = {
  server: UserSettings,
  client: DeepPartial<UserSettings> | undefined,
};

export const useUserSettings = ({server, client}: UseUserSettingsOpts): CalculatedUserSettings => {
  return useCustomCompareMemo(
    () => {
      const settings = cloneMerge(server, client);

      return {
        bonus: toEffectiveBonus(settings),
        noCollectDurations: getNoCollectDurationsFromSleepSession(settings.stamina.sleepSession),
      };
    },
    [client],
    (prev, next) => isEqual(prev, next),
  );
};
