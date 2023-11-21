import React from 'react';

import {FilterCategoryInput} from '@/components/input/filter/category';
import {FilterCategoryInputProps} from '@/components/input/filter/type';
import {getTextFilterButtonClass} from '@/components/input/filter/utils/props';
import {IndexableNonSymbol, Optional} from '@/utils/type';


type Props<TId extends IndexableNonSymbol | null> = Optional<FilterCategoryInputProps<TId>, 'getClassNames'>;

export const FilterTextInput = <TId extends IndexableNonSymbol | null>(props: Props<TId>) => {
  return (
    <FilterCategoryInput
      getClassNames={getTextFilterButtonClass}
      {...props}
    />
  );
};
