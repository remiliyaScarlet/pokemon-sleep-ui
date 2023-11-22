import {FilterInputCommonProps} from '@/components/input/filter/common/type';
import {IndexableNonSymbol} from '@/utils/type';


export type FilterCollapsedInputProps<TId extends IndexableNonSymbol | null> =
  Omit<FilterInputCommonProps<TId>, 'idToButton'> & {
    idToText: (id: TId) => string,
  };
