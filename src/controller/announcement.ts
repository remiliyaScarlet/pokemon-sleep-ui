import {Collection} from 'mongodb';

import mongoPromise from '@/lib/mongodb';
import {Announcement} from '@/types/mongo/announcement';
import {Locale} from '@/types/next/locale';


const getCollection = async (): Promise<Collection<Announcement>> => {
  const client = await mongoPromise;

  return client
    .db('announcement')
    .collection<Announcement>('data');
};

export const getAllAnnouncements = async (locale: Locale | null): Promise<Announcement[]> => {
  return (await getCollection())
    .find({locale: locale ?? 'en'})
    .map(({_id, ...rest}) => rest)
    .toArray();
};
