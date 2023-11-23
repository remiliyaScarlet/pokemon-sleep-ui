import {Collection} from 'mongodb';

import {regexUuid} from '@/const/regex';
import {defaultLocale} from '@/const/website';
import {getDataAsArray, getDataAsMap} from '@/controller/common';
import {throwIfNotAdmin} from '@/controller/user/account/common';
import {ControllerRequireUserIdOpts} from '@/controller/user/account/type';
import mongoPromise from '@/lib/mongodb';
import {Announcement, announcementLevels, AnnouncementMap} from '@/types/mongo/announcement';
import {Locale, locales} from '@/types/next/locale';
import {isNotNullish} from '@/utils/type';


const getCollection = async (): Promise<Collection<Announcement>> => {
  const client = await mongoPromise;

  return client
    .db('announcement')
    .collection<Announcement>('data');
};

type UpdateAnnouncementsOpts = ControllerRequireUserIdOpts & {
  data: AnnouncementMap,
};

export const updateAnnouncements = async ({data, executorUserId}: UpdateAnnouncementsOpts) => {
  throwIfNotAdmin(executorUserId);

  const collection = await getCollection();

  await (await mongoPromise).withSession(async (session) => {
    await collection.deleteMany({}, {session});
    await collection.insertMany(Object.values(data).filter(isNotNullish), {session});
  });
};

export const getAnnouncementsOfLocale = async (locale: Locale | null): Promise<Announcement[]> => {
  return getDataAsArray(getCollection(), {locale: locale ?? defaultLocale}, {order: -1});
};

export const getAllAnnouncements = async (): Promise<AnnouncementMap> => {
  return getDataAsMap(getCollection(), ({uuid}) => uuid);
};

const addValidation = async () => {
  // Needs to match the type of `Announcement`
  await (await mongoPromise)
    .db('announcement')
    .command({
      collMod: 'data',
      validator: {
        $jsonSchema: {
          required: [
            '_id',
            'uuid',
            'message',
            'locale',
            'level',
          ],
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
            uuid: {
              bsonType: 'string',
              pattern: regexUuid.source,
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
