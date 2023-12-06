import isEqual from 'lodash/isEqual';
import {useCustomCompareMemo} from 'use-custom-compare';

import {defaultUserSettings} from '@/const/user/settings';
import {UseUserDataOpts} from '@/hooks/userData/type';
import {UserSettings} from '@/types/userData/settings';
import {migrate} from '@/utils/migrate/main';
import {userSettingsMigrators} from '@/utils/migrate/userSettings/migrators';
import {cloneMerge} from '@/utils/object/cloneMerge';


export const useUserSettings = ({server, client}: UseUserDataOpts<UserSettings>): UserSettings => {
  return useCustomCompareMemo(
    () => migrate({
      original: defaultUserSettings,
      override: cloneMerge(server, client),
      migrators: userSettingsMigrators,
      migrateParams: {},
    }),
    [client],
    (prev, next) => isEqual(prev, next),
  );
};
