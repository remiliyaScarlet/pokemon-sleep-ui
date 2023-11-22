import React from 'react';

import {FilterToggleButtons} from '@/components/input/filter/common/button';
import {FilterInputLayout} from '@/components/input/filter/common/layout';
import {FilterExpandedInputProps} from '@/components/input/filter/expanded/type';
import {iconFilterButtonStyle} from '@/styles/input';
import {IndexableNonSymbol} from '@/utils/type';


export const FilterExpandedInput = <TId extends IndexableNonSymbol | null>(props: FilterExpandedInputProps<TId>) => {
  return (
    <FilterInputLayout {...props}>
      <FilterToggleButtons className={iconFilterButtonStyle} {...props}/>
    </FilterInputLayout>
  );
};
