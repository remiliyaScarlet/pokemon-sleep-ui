import {DefaultSession} from 'next-auth';

import {UserData} from '@/types/userData';


declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      data: UserData,
    };
  }
}
