import {ObjectId} from 'bson';
import {Collection} from 'mongodb';
import {User} from 'next-auth';

import mongoPromise from '@/lib/mongodb';
import {UserIdToEmailMap} from '@/types/mongo/activation';


const getCollection = async (): Promise<Collection<User>> => {
  const client = await mongoPromise;

  return client
    .db('auth')
    .collection<User>('users');
};

export const getUserIdEmailMap = async (ids: ObjectId[]): Promise<UserIdToEmailMap> => {
  const data = await (await getCollection())
    .find({_id: {$in: ids}})
    .toArray();

  return Object.fromEntries(data.map((data) => [data._id.toString(), data.email]));
};
