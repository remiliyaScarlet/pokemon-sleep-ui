import {DefaultSession} from 'next-auth';

import {UserData} from '@/types/userData';


export type NextAuthSessionUser = DefaultSession['user'] & {
  id: string,
  data: UserData,
};

declare module 'next-auth' {
  interface Session {
    user: NextAuthSessionUser;
  }
}
