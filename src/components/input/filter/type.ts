import React from 'react';

import {I18nMessageKeysOfNamespace, I18nNamespaces} from '@/types/i18n';
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

export type FilterCategoryInputProps<TId, TNamespace extends I18nNamespaces> = FilterInputOnClickProps<TId> & {
  titleI18nNamespace: TNamespace,
  titleI18nKey: I18nMessageKeysOfNamespace<TNamespace>,
  ids: TId[],
  idToButton: (id: TId) => React.ReactNode,
  idToItemId: (id: TId) => string,
  getClassNames: (isActive: boolean) => string,
  highlight?: boolean,
};
