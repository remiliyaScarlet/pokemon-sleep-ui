import React from 'react';

import {FilterCollapsedInput} from '@/components/input/filter/collapsed/main';
import {FilterCollapsedInputProps} from '@/components/input/filter/collapsed/type';
import {FilterExpandedInput} from '@/components/input/filter/expanded/main';
import {textFilterButtonStyle} from '@/styles/input';
import {IndexableNonSymbol} from '@/utils/type';


export const FilterTextInput = <TId extends IndexableNonSymbol | null>(props: FilterCollapsedInputProps<TId>) => {
  const {ids, idToText} = props;

  if (ids.length < 10) {
    return (
      <FilterExpandedInput
        idToButton={idToText}
        className={textFilterButtonStyle}
        {...props}
      />
    );
  }

  return (
    <FilterCollapsedInput
      className={textFilterButtonStyle}
      {...props}
    />
  );
};
