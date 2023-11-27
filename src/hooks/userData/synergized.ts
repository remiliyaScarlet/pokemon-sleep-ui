import isEqual from 'lodash/isEqual';
import {useCustomCompareMemo} from 'use-custom-compare';

import {SynergizedUserSettings} from '@/types/userData/settings';
import {toSynergizedUserSettings, ToSynergizedUserSettingsOpts} from '@/utils/user/settings/synergized';


export const useSynergizedSettings = ({
  cooking,
  mealMap,
}: ToSynergizedUserSettingsOpts): SynergizedUserSettings => {
  return useCustomCompareMemo(
    () => toSynergizedUserSettings({
      cooking,
      mealMap,
    }),
    [cooking, mealMap],
    (prev, next) => isEqual(prev, next),
  );
};
