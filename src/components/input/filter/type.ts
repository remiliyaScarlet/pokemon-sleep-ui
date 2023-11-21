import React from 'react';

import {ReactStateUpdaterFromOriginal} from '@/types/react';
import {Indexable, IndexableNonSymbol} from '@/utils/type';


export type InputRowProps = {
  style?: FilterRowBackgroundStyle,
  ender?: React.ReactNode,
  noFixedTitleWidth?: boolean,
  noRowPadding?: boolean,
  className?: string,
};

export type FilterInclusionMap<TId extends Indexable> = {[id in TId]?: boolean};

export type FilterWithInclusionMap<TId extends Indexable> = Record<string, FilterInclusionMap<TId> | any>;

export type FilterInputProps<TFilter> = {
  filter: TFilter,
  setFilter: React.Dispatch<React.SetStateAction<TFilter>>,
};

export type FilterWithUpdaterProps<TFilter> = {
  filter: TFilter,
  setFilter: ReactStateUpdaterFromOriginal<TFilter>,
};

export type FilterInputOnClickProps<TId> = {
  onClick: (id: TId) => void,
  isActive: (id: TId) => boolean,
};

export type FilterCategoryInputProps<TId extends IndexableNonSymbol | null> =
  FilterInputOnClickProps<TId> &
  InputRowProps & {
    title: React.ReactNode,
    ids: TId[],
    idToButton: (id: TId, isActive: boolean) => React.ReactNode,
    isHidden?: (id: TId) => boolean,
    getClassNames: (isActive: boolean, id: TId) => string,
    noWrap?: boolean,
  };

export type FilterRowBackgroundStyle = 'none' | 'normal' | 'highlight';
