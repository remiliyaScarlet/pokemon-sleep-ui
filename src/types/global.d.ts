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
      NEXTAUTH_GOOGLE_CLIENT_ID: string;
      NEXTAUTH_GOOGLE_CLIENT_SECRET: string;
    }
  }
}
