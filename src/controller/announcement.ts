import {Collection} from 'mongodb';

import {locales} from '@/const';
import mongoPromise from '@/lib/mongodb';
import {Announcement, announcementLevels} from '@/types/mongo/announcement';
import {Locale} from '@/types/next/locale';


const getCollection = async (): Promise<Collection<Announcement>> => {
  const client = await mongoPromise;

  return client
    .db('announcement')
    .collection<Announcement>('data');
};

const addAnnouncementDataValidation = async () => {
  // Needs to match the type of `Announcement`
  await (await mongoPromise)
    .db('announcement')
    .command({
      collMod: 'data',
      validator: {
        $jsonSchema: {
          required: ['_id', 'message', 'locale', 'level'],
          properties: {
            _id: {
              bsonType: 'objectId',
            },
            message: {
              bsonType: 'string',
            },
            locale: {
              bsonType: 'array',
              items: {
                enum: locales,
              },
            },
            level: {
              enum: announcementLevels,
            },
          },
          additionalProperties: false,
        },
      },
    });
};

export const getAllAnnouncements = async (locale: Locale | null): Promise<Announcement[]> => {
  return (await getCollection())
    .find({locale: locale ?? 'en'})
    .map(({_id, ...rest}) => rest)
    .toArray();
};

addAnnouncementDataValidation()
  .catch((e) => console.error('MongoDB failed to add announcement validation', e));
