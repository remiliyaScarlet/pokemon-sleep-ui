import {KeysOfType} from '@/utils/type';


export type FilterEnforcerKeyWithDefault<TFilter, TValue> = {
  key: KeysOfType<TFilter, TValue>,
  defaultValue: TValue,
};
