import isEqual from 'lodash/isEqual';
import {useCustomCompareMemo} from 'use-custom-compare';

import {UseUserSettingsOpts} from '@/hooks/userData/settings/type';
import {UserSettings} from '@/types/userData/settings';
import {cloneMerge} from '@/utils/object/cloneMerge';


export const useUserSettings = ({server, client}: UseUserSettingsOpts): UserSettings => {
  return useCustomCompareMemo(
    () => cloneMerge(server, client),
    [client],
    (prev, next) => isEqual(prev, next),
  );
};
