import {MongoDBAdapter as mongoDBAdapter} from '@next-auth/mongodb-adapter';
import {AuthOptions} from 'next-auth';
import emailProvider from 'next-auth/providers/email';
import googleProvider from 'next-auth/providers/google';

import {getUserActivation} from '@/controller/user/activation/data';
import {emptyLazyData, getUserLazyData} from '@/controller/user/lazyLoad';
import {getUserPreloadedData} from '@/controller/user/preload';
import {uploadUserData} from '@/controller/user/upload';
import mongoPromise from '@/lib/mongodb';
import {NextAuthSessionUser} from '@/types/auth';
import {UserDataAction} from '@/types/userData/main';


const cookieDomain = process.env.NEXTAUTH_COOKIE_DOMAIN;

if (!cookieDomain) {
  throw new Error('Invalid/missing environment variable `NEXTAUTH_COOKIE_DOMAIN`.');
}

const useSecureCookies = cookieDomain.startsWith('https://');
const cookiePrefix = useSecureCookies ? '__Secure-' : '';
const hostName = new URL(cookieDomain).hostname;

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: mongoDBAdapter(
    mongoPromise,
    {databaseName: 'auth'},
  ),
  pages: {
    signIn: '/auth/sign-in',
    verifyRequest: '/auth/verify-request',
  },
  providers: [
    emailProvider({
      server: process.env.NEXTAUTH_EMAIL_SERVER,
      from: process.env.NEXTAUTH_EMAIL_FROM,
    }),
    googleProvider({
      clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET,
    }),
  ],
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        domain: '.' + hostName,
        secure: useSecureCookies,
      },
    },
  },
  callbacks: {
    session: async ({session, user, trigger, newSession}) => {
      const userId = user.id;

      const [preloaded, activation] = await Promise.all([
        getUserPreloadedData(userId),
        getUserActivation(userId),
      ]);
      session.user = {
        id: userId,
        email: user.email,
        preloaded,
        lazyLoaded: emptyLazyData,
        activation,
        build: process.env.NEXT_PUBLIC_BUILD_ID,
      } satisfies NextAuthSessionUser;

      if (trigger !== 'update' || !newSession) {
        return session;
      }

      const {action, options} = newSession as UserDataAction;

      if (action === 'upload') {
        await uploadUserData({userId, opts: options});
        session.user.preloaded = await getUserPreloadedData(userId);
      } else if (action === 'load') {
        session.user.lazyLoaded = await getUserLazyData({
          initialData: session.user.lazyLoaded,
          userId,
          options,
        });
      } else {
        console.error(`Unhandled user data action ${action satisfies never}`);
      }

      return session;
    },
  },
};
