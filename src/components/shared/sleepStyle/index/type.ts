import {MapIndexSleepdexCompletionProps} from '@/components/shared/sleepStyle/common/type';
import {FieldMetaMap} from '@/types/game/mapMeta';


export type MapIndexServerDataProps = MapIndexSleepdexCompletionProps & {
  mapMeta: FieldMetaMap,
  isLoggedIn: boolean,
};
