import {FieldMetaMap} from '@/types/game/mapMeta';
import {MapIndexSleepdexCompletionProps} from '@/ui/map/common/type';


export type MapIndexServerDataProps = MapIndexSleepdexCompletionProps & {
  mapMeta: FieldMetaMap,
  isLoggedIn: boolean,
};
