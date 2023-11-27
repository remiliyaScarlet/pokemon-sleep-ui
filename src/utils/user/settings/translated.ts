import {TranslatedUserSettings} from '@/types/userData/settings';
import {toCalculatedUserSettings, ToCalculatedUserSettingsOpts} from '@/utils/user/settings/calculated';
import {toSynergizedUserSettings, ToSynergizedUserSettingsOpts} from '@/utils/user/settings/synergized';


type ToTranslatedSettingsOpts = ToCalculatedUserSettingsOpts & ToSynergizedUserSettingsOpts;

export const toTranslatedSettings = (opts: ToTranslatedSettingsOpts): TranslatedUserSettings => {
  return {
    ...toCalculatedUserSettings(opts),
    ...toSynergizedUserSettings(opts),
  };
};
