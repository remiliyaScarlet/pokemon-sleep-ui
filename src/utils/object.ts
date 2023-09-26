import merge from 'lodash/merge';

import {DeepPartial} from '@/utils/type';


export const cloneMerge = <TSource>(
  source: TSource,
  ...others: (DeepPartial<TSource> | null | undefined)[]
): TSource => {
  // Have an empty object as the first so the merged object is cloned (and `source` won't be modified)
  // https://stackoverflow.com/a/28044419/11571888
  return merge({}, source, ...others);
};

type KvSwapOpts<TValue> = {
  source: {[key in string]: TValue},
  keyToValue: (key: string) => TValue,
  valueToKey: (value: TValue) => string,
};

export const kvSwap = <TValue>({source, keyToValue, valueToKey}: KvSwapOpts<TValue>) => (
  Object.fromEntries(Object.entries(source).map(([k, v]) => [valueToKey(v), keyToValue(k)]))
);
