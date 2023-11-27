import isEqual from 'lodash/isEqual';
import {useCustomCompareMemo} from 'use-custom-compare';

import {useUserSettingsBundle} from '@/hooks/userData/bundle';
import {UseUserDataOpts} from '@/hooks/userData/type';
import {UserCookingPreset} from '@/types/userData/cooking';
import {
  CalculatedUserSettings,
  SynergizedSettingsRequiredData,
  SynergizedUserSettings,
  TranslatedUserSettings,
  UserSettings,
  UserSettingsBundle,
} from '@/types/userData/settings';
import {toCalculatedUserSettings} from '@/utils/user/settings/calculated';
import {toSynergizedUserSettings} from '@/utils/user/settings/synergized';


type UseTranslatedUserSettingsOpts = SynergizedSettingsRequiredData & {
  bundle: UseUserDataOpts<UserSettingsBundle>,
};

type UseTranslatedUserSettingsReturn = {
  settings: UserSettings,
  cooking: UserCookingPreset,
  calculatedSettings: CalculatedUserSettings,
  synergizedSettings: SynergizedUserSettings,
  translatedSettings: TranslatedUserSettings,
};

export const useTranslatedUserSettings = ({
  bundle,
  mealMap,
}: UseTranslatedUserSettingsOpts): UseTranslatedUserSettingsReturn => {
  const {settings, cooking} = useUserSettingsBundle({bundle});

  return useCustomCompareMemo(
    () => {
      const calculatedSettings = toCalculatedUserSettings({settings});
      const synergizedSettings = toSynergizedUserSettings({
        cooking,
        mealMap,
      });

      return {
        settings,
        cooking,
        calculatedSettings,
        synergizedSettings,
        translatedSettings: {...calculatedSettings, ...synergizedSettings},
      };
    },
    [settings, cooking],
    (prev, next) => isEqual(prev, next),
  );
};
