import {DefaultSession} from 'next-auth';

import {UserLazyLoadedData, UserPreloadedData} from '@/types/userData/userData';


export type NextAuthSessionUser = DefaultSession['user'] & {
  id: string,
  preloaded: UserPreloadedData,
  lazyLoaded: UserLazyLoadedData,
};

declare module 'next-auth' {
  interface Session {
    user: NextAuthSessionUser;
  }
}
