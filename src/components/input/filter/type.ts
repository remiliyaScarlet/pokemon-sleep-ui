import React from 'react';

import {Indexable} from '@/utils/type';


export type InputRowProps = {
  style?: FilterRowBackgroundStyle,
  ender?: React.ReactNode,
  noFixedTitleWidth?: boolean,
};

export type FilterInclusionMap<TId extends Indexable> = {[id in TId]?: boolean};

export type FilterWithInclusionMap<TId extends Indexable> = Record<string, FilterInclusionMap<TId> | any>;

export type FilterInputProps<TFilter> = {
  filter: TFilter,
  setFilter: React.Dispatch<React.SetStateAction<TFilter>>,
};

export type FilterInputSetFromOriginalProps<TFilter> = {
  filter: TFilter,
  setFilter: (getUpdated: (original: TFilter) => TFilter) => void,
};

export type FilterInputOnClickProps<TId> = {
  onClick: (id: TId) => void,
  isActive: (id: TId) => boolean,
};

export type FilterCategoryInputProps<TId> = FilterInputOnClickProps<TId> & InputRowProps & {
  title: React.ReactNode,
  ids: TId[],
  idToButton: (id: TId, isActive: boolean) => React.ReactNode,
  idToItemId: (id: TId) => string,
  isHidden?: (id: TId) => boolean,
  getClassNames: (isActive: boolean, id: TId) => string,
};

export type FilterRowBackgroundStyle = 'none' | 'normal' | 'highlight';
