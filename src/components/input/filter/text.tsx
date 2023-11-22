import React from 'react';

import {FilterExpandedInput} from '@/components/input/filter/expanded/main';
import {FilterExpandedInputProps} from '@/components/input/filter/expanded/type';
import {textFilterButtonStyle} from '@/styles/input';
import {IndexableNonSymbol, Optional} from '@/utils/type';


type Props<TId extends IndexableNonSymbol | null> = Optional<FilterExpandedInputProps<TId>, 'classNameOfButton'>;

export const FilterTextInput = <TId extends IndexableNonSymbol | null>(props: Props<TId>) => {
  return (
    <FilterExpandedInput
      classNameOfButton={textFilterButtonStyle}
      {...props}
    />
  );
};
