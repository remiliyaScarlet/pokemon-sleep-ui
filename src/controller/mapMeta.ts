import {Collection} from 'mongodb';

import {getDataAsMap, getSingleData} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {BerryId} from '@/types/game/berry';
import {BerryFavoriteInfo, BerryFavoriteType, FieldMetaMap, MapMeta} from '@/types/game/mapMeta';
import {SleepMapId} from '@/types/game/sleepStyle';


const getCollection = async (): Promise<Collection<MapMeta>> => {
  const client = await mongoPromise;

  return client
    .db('map')
    .collection<MapMeta>('meta');
};

export const getAllMapMeta = async (): Promise<FieldMetaMap> => {
  return getDataAsMap(getCollection(), ({mapId}) => mapId);
};

export const getMapIds = async (): Promise<SleepMapId[]> => {
  return (await getCollection()).find().map(({mapId}) => mapId).toArray();
};

export const getMapMeta = async (mapId: SleepMapId): Promise<MapMeta | null> => (
  getSingleData(getCollection(), {mapId})
);

export const getFavoriteInfoOfBerry = async (berry: BerryId): Promise<BerryFavoriteInfo> => {
  return Object.fromEntries(await (await getCollection())
    .find({}, {projection: {_id: false}})
    .map((data) => [
      data.mapId,
      (data.berry ?
        (data.berry.includes(berry) ? 'fixed' : 'unavailable') :
        'random') satisfies BerryFavoriteType,
    ])
    .toArray());
};

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({mapId: 1}, {unique: true}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize map meta index', e));
