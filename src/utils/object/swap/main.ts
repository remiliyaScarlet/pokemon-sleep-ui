import {KvSwapCommonOpts} from '@/utils/object/swap/type';


type KvSwapOpts<TOriginalValue, TSwappedValue> = KvSwapCommonOpts<TOriginalValue> & {
  keyToValue: (key: string) => TSwappedValue,
  valueToKey: (value: TOriginalValue) => string,
};

export const kvSwap = <TOriginalValue, TSwappedValue>({
  source,
  keyToValue,
  valueToKey,
}: KvSwapOpts<TOriginalValue, TSwappedValue>) => (
  Object.fromEntries(Object.entries(source).map(([k, v]) => [valueToKey(v), keyToValue(k)]))
);
