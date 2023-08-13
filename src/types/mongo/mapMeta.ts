import {BerryId} from '@/types/mongo/berry';
import {SleepMapId} from '@/types/mongo/sleepStyle';


export type MapUnlockCondition = null | {
  type: 'sleepStyle',
  count: number,
};

export type MapMeta = {
  mapId: SleepMapId,
} & ({
  berry: BerryId[],
  unlock: MapUnlockCondition,
} | {
  berry: null,
  unlock: null,
});

export type FieldMetaMap = {[map in SleepMapId]?: MapMeta};

export const berryFavoriteType = [
  'fixed',
  'random',
  'unavailable',
] as const;

export type BerryFavoriteType = typeof berryFavoriteType[number];

export type BerryFavoriteInfo = {[map in SleepMapId]?: BerryFavoriteType};
