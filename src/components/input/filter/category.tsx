import React from 'react';

import {FilterSingleCategoryInput} from '@/components/input/filter/base/single';
import {FilterCategoryInputProps} from '@/components/input/filter/type';
import {IndexableNonSymbol} from '@/utils/type';


export const FilterCategoryInput = <TId extends IndexableNonSymbol | null>(props: FilterCategoryInputProps<TId>) => {
  return <FilterSingleCategoryInput {...props}/>;
};
