import React from 'react';

import {FilterInputOnClickProps, InputRowProps} from '@/components/input/filter/type';
import {IndexableNonSymbol} from '@/utils/type';


export type FilterExpandedInputProps<TId extends IndexableNonSymbol | null> =
  FilterInputOnClickProps<TId> &
  InputRowProps & {
    classNameOfButton: string,
    title: React.ReactNode,
    ids: TId[],
    idToButton: (id: TId, isActive: boolean) => React.ReactNode,
    isHidden?: (id: TId) => boolean,
    noWrap?: boolean,
  };
