import {Collection, Document, Filter, WithId} from 'mongodb';

import {Indexable} from '@/utils/type';


export const getDataAsMap = async <TData extends Document>(
  collection: Promise<Collection<TData>>,
  getKey: (data: WithId<TData>) => Indexable,
  filter?: Filter<TData>,
) => {
  return Object.fromEntries((await (await collection)
    .find(filter ?? {}, {projection: {_id: false}})
    .toArray())
    .map((data) => [getKey(data), data]));
};

export const getDataAsArray = async <TData extends Document>(
  collection: Promise<Collection<TData>>,
  filter?: Filter<TData>,
) => {
  return (await collection).find(filter ?? {}, {projection: {_id: false}}).toArray();
};
