import {kvSwap} from '@/utils/object/swap/main';
import {KvSwapCommonOpts} from '@/utils/object/swap/type';


type KvSwapValueAsIntOpts = KvSwapCommonOpts<string>;

export const kvSwapValueAsInt = ({source}: KvSwapValueAsIntOpts) => kvSwap({
  source,
  keyToValue: (key) => parseInt(key),
  valueToKey: (value) => value,
});
