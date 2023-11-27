import {defaultCookingPreset} from '@/const/user/cooking';
import {defaultUserSettings} from '@/const/user/settings';
import {UserSettingsBundle} from '@/types/userData/settings';


export const defaultUserSettingsBundle: UserSettingsBundle = {
  settings: defaultUserSettings,
  cooking: defaultCookingPreset,
};
