import React from 'react';

import {FilterCategoryInput} from '@/components/input/filter/category';
import {FilterCategoryInputProps} from '@/components/input/filter/type';
import {getFilterInputButtonClass} from '@/components/input/filter/utils';


type Props<TId> = Omit<FilterCategoryInputProps<TId>, 'getClassNames'>;

export const FilterTextInput = <TId, >(props: Props<TId>) => {
  return (
    <FilterCategoryInput
      getClassNames={getFilterInputButtonClass}
      {...props}
    />
  );
};
