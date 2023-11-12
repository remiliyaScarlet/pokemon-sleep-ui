import {FilterWithUpdaterProps} from '@/components/input/filter/type';
import {MapCommonProps, MapPageFilter} from '@/components/shared/sleepStyle/page/type';


export type MapInputCommonProps = FilterWithUpdaterProps<MapPageFilter>;

export type MapInputWithDataProps = MapInputCommonProps & MapCommonProps;
