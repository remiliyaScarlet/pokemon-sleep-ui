import {DeepPartial} from '@/utils/type';


export type UseUserDataOpts<TObject> = {
  server: TObject,
  client: DeepPartial<TObject> | undefined,
};
