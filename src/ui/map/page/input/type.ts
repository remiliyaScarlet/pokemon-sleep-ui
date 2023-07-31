import {FilterInputProps} from '@/components/input/filter/type';
import {MapCommonProps, MapPageFilter} from '@/ui/map/page/type';


export type MapInputCommonProps = FilterInputProps<MapPageFilter> & MapCommonProps;
