import isEqual from 'lodash/isEqual';
import {useCustomCompareMemo} from 'use-custom-compare';

import {EffectiveBonus} from '@/types/game/bonus';
import {UserSettings} from '@/types/userData/settings';
import {getNoCollectDurationsFromSleepSession} from '@/utils/game/sleep';
import {cloneMerge} from '@/utils/object';
import {DeepPartial} from '@/utils/type';
import {toEffectiveBonus} from '@/utils/user/settings';


type UseUserSettingsOpts = {
  server: UserSettings,
  client: DeepPartial<UserSettings> | undefined,
};

type UseUserSettingsReturn = {
  bonus: EffectiveBonus,
  noCollectDurations: number[],
};

export const useUserSettings = ({server, client}: UseUserSettingsOpts): UseUserSettingsReturn => {
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
