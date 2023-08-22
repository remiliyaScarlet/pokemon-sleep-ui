import {Collection} from 'mongodb';

import {getDataAsMap} from '@/controller/common';
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

export const getMapMeta = async (mapId: SleepMapId): Promise<MapMeta | null> => (
  (await getCollection()).findOne({mapId}, {projection: {_id: false}})
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

const addMapMetaIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({mapId: 1}, {unique: true}),
  ]);
};

addMapMetaIndex()
  .catch((e) => console.error('MongoDB failed to add map meta index', e));
