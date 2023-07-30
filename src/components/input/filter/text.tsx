import React from 'react';

import {FilterCategoryInput} from '@/components/input/filter/category';
import {FilterCategoryInputProps} from '@/components/input/filter/type';
import {getFilterInputButtonClass} from '@/components/input/filter/utils/props';
import {Optional} from '@/utils/type';


type Props<TId> = Optional<FilterCategoryInputProps<TId>, 'getClassNames'>;

export const FilterTextInput = <TId, >(props: Props<TId>) => {
  return (
    <FilterCategoryInput
      getClassNames={getFilterInputButtonClass}
      {...props}
    />
  );
};
