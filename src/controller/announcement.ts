import {Collection} from 'mongodb';

import {defaultLocale, locales} from '@/const/website';
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
    .find({locale: locale ?? defaultLocale}, {sort: {order: -1}, projection: {_id: false}})
    .toArray();
};

const addValidation = async () => {
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

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({locale: 1}),
    collection.createIndex({expiry: 1}, {expireAfterSeconds: 0}),
    collection.createIndex({order: -1}),
  ]);
};

addValidation().catch((e) => console.error('MongoDB failed to initialize announcement validation', e));

addIndex().catch((e) => console.error('MongoDB failed to initialize announcement index', e));
