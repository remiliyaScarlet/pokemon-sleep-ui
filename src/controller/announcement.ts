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

export const getAllAnnouncements = async (locale: Locale | null): Promise<Announcement[]> => {
  return (await getCollection())
    .find({locale: locale ?? 'en'}, {sort: {order: -1}, projection: {_id: false}})
    .toArray();
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
            expiry: {
              bsonType: 'date',
            },
            order: {
              bsonType: 'int',
            },
          },
          additionalProperties: false,
        },
      },
    });
};

const addAnnouncementDataIndex = async () => {
  return Promise.all([
    (await getCollection()).createIndex({'locale': 1}),
    (await getCollection()).createIndex({'expiry': 1}, {expireAfterSeconds: 0}),
    (await getCollection()).createIndex({'order': -1}),
  ]);
};

addAnnouncementDataValidation()
  .catch((e) => console.error('MongoDB failed to add announcement validation', e));
addAnnouncementDataIndex()
  .catch((e) => console.error('MongoDB failed to add announcement index', e));
