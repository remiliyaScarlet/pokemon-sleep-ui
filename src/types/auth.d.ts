import {DefaultSession} from 'next-auth';

import {UserActivationStatus} from '@/types/mongo/user';
import {UserLazyLoadedData, UserPreloadedData} from '@/types/userData/main';


export type NextAuthSessionUser = DefaultSession['user'] & {
  id: string,
  preloaded: UserPreloadedData,
  lazyLoaded: UserLazyLoadedData,
  activation: UserActivationStatus | null,
  build: string,
};

declare module 'next-auth' {
  interface Session {
    user: NextAuthSessionUser;
  }
}
