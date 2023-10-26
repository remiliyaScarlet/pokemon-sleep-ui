import {UserSettings} from '@/types/userData/settings';
import {DeepPartial} from '@/utils/type';


export type UseUserSettingsOpts = {
  server: UserSettings,
  client: DeepPartial<UserSettings> | undefined,
};
