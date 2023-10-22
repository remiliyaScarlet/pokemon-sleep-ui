import {ObjectId} from 'bson';
import {Collection} from 'mongodb';
import {User} from 'next-auth';

import mongoPromise from '@/lib/mongodb';
import {UserIdToEmailMap} from '@/types/mongo/auth';


const getCollection = async (): Promise<Collection<User>> => {
  const client = await mongoPromise;

  return client
    .db('auth')
    .collection<User>('users');
};

export const getUserIdEmailMap = async (ids: string[]): Promise<UserIdToEmailMap> => {
  const data = await (await getCollection())
    .find({_id: {$in: ids.map((id) => new ObjectId(id))}})
    .toArray();

  return Object.fromEntries(data.map((data) => [data._id.toString(), data.email]));
};
