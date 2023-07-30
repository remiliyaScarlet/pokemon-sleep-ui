import React from 'react';

import {Indexable} from '@/utils/type';


export type FilterInclusionMap<TId extends Indexable> = {[id in TId]?: boolean};

export type FilterWithInclusionMap<TId extends Indexable> = Record<TId, FilterInclusionMap<TId> | any>;

export type FilterInputProps<TFilter> = {
  filter: TFilter,
  setFilter: React.Dispatch<React.SetStateAction<TFilter>>,
};

export type FilterInputOnClickProps<TId> = {
  onClick: (id: TId) => void,
  isActive: (id: TId) => boolean,
};

export type FilterCategoryInputProps<TId> = FilterInputOnClickProps<TId> & {
  title: React.ReactNode,
  ids: TId[],
  idToButton: (id: TId) => React.ReactNode,
  idToItemId: (id: TId) => string,
  getClassNames: (isActive: boolean, id: TId) => string,
  style?: FilterRowBackgroundStyle,
};

export type FilterRowBackgroundStyle = 'none' | 'normal' | 'highlight';
