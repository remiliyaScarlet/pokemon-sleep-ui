import {Collection} from 'mongodb';

import mongoPromise from '@/lib/mongodb';
import {FieldMetaMap, MapMeta} from '@/types/mongo/mapMeta';
import {SleepMapId} from '@/types/mongo/sleepStyle';


const getCollection = async (): Promise<Collection<MapMeta>> => {
  const client = await mongoPromise;

  return client
    .db('map')
    .collection<MapMeta>('meta');
};

export const getAllMapMeta = async (): Promise<FieldMetaMap> => {
  const ret: FieldMetaMap = {};

  for await (const map of (await getCollection()).find({}, {projection: {_id: false}})) {
    ret[map.mapId] = map;
  }

  return ret;
};

export const getMapMeta = async (mapId: SleepMapId): Promise<MapMeta | null> => (
  (await getCollection()).findOne({mapId}, {projection: {_id: false}})
);

const addMapMetaIndex = async () => {
  return Promise.all([
    (await getCollection()).createIndex({mapId: 1}, {unique: true}),
  ]);
};

addMapMetaIndex()
  .catch((e) => console.error('MongoDB failed to add map meta index', e));
