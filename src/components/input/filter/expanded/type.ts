import {FilterInputCommonProps} from '@/components/input/filter/common/type';
import {IndexableNonSymbol} from '@/utils/type';


export type FilterExpandedInputProps<TId extends IndexableNonSymbol | null> = FilterInputCommonProps<TId>;
