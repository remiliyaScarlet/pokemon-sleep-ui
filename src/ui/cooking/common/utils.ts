import {Session} from 'next-auth';

import {CookingPreloadedData} from '@/ui/cooking/common/type';
import {createUserSettings} from '@/utils/user/settings';


export const toCookingPreloadedData = (session: Session | null): CookingPreloadedData => {
  return {
    cooking: session?.user.preloaded.cooking,
    settings: createUserSettings(session?.user.preloaded.settings),
  };
};
