import {Collection} from 'mongodb';

import mongoPromise from '@/lib/mongodb';
import {NextAuthUserInDatabase} from '@/types/auth';


const getCollection = async (): Promise<Collection<NextAuthUserInDatabase>> => {
  const client = await mongoPromise;

  return client
    .db('auth')
    .collection<NextAuthUserInDatabase>('users');
};

export const getUserCount = async () => {
  return (await getCollection()).estimatedDocumentCount();
};
