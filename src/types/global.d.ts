import React from 'react';

import {MongoClient} from 'mongodb';


declare global {
  const _mongoClientPromise: Promise<MongoClient>;

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';

      MONGODB_URI: string;

      NEXTAUTH_URL: string;
      NEXTAUTH_COOKIE_DOMAIN: string;
      NEXTAUTH_SECRET: string;
      NEXTAUTH_EMAIL_SERVER: string;
      NEXTAUTH_EMAIL_FROM: string;
      NEXTAUTH_GOOGLE_CLIENT_ID: string;
      NEXTAUTH_GOOGLE_CLIENT_SECRET: string;

      NEXTAUTH_ADMIN_UID: string;

      NEXT_PUBLIC_BUILD_ID: string;
    }
  }
}

declare module 'react' {
  // Has to redeclare for generic of `forwardRef()` to work
  // https://fettblog.eu/typescript-react-generic-forward-refs/
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactNode | null
  ): (props: P & React.RefAttributes<T>) => React.ReactNode | null;
}
