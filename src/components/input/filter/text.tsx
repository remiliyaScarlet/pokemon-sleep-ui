import React from 'react';

import {FilterCategoryInput} from '@/components/input/filter/category';
import {FilterCategoryInputProps} from '@/components/input/filter/type';
import {textFilterButtonStyle} from '@/styles/input';
import {IndexableNonSymbol, Optional} from '@/utils/type';


type Props<TId extends IndexableNonSymbol | null> = Optional<FilterCategoryInputProps<TId>, 'classNameOfButton'>;

export const FilterTextInput = <TId extends IndexableNonSymbol | null>(props: Props<TId>) => {
  return (
    <FilterCategoryInput
      classNameOfButton={textFilterButtonStyle}
      {...props}
    />
  );
};
