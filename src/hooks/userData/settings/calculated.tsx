import isEqual from 'lodash/isEqual';
import {useCustomCompareMemo} from 'use-custom-compare';

import {useUserSettings} from '@/hooks/userData/settings/main';
import {UseUserSettingsOpts} from '@/hooks/userData/settings/type';
import {CalculatedUserSettings, UserSettings} from '@/types/userData/settings';
import {toCalculatedUserSettings} from '@/utils/user/settings';


type UseCalculatedUserSettingsReturn = {
  settings: UserSettings,
  calculatedSettings: CalculatedUserSettings,
};

export const useCalculatedUserSettings = (opts: UseUserSettingsOpts): UseCalculatedUserSettingsReturn => {
  const settings = useUserSettings(opts);

  return useCustomCompareMemo(
    () => ({
      settings,
      calculatedSettings: toCalculatedUserSettings({settings}),
    }),
    [settings],
    (prev, next) => isEqual(prev, next),
  );
};
