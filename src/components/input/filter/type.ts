import React from 'react';

import {I18nMessageKeysOfNamespace, I18nNamespaces} from '@/types/i18n';
import {Indexable, KeysOfType} from '@/utils/type';


export type FilterInclusionMap<TId extends Indexable> = {[id in TId]?: boolean};

export type FilterInputProps<TFilter> = {
  filter: TFilter,
  setFilter: React.Dispatch<React.SetStateAction<TFilter>>,
};

export type FilterCategoryInputProps<
  TFilter,
  TData,
  TId,
  TNamespace extends I18nNamespaces,
> = FilterInputProps<TFilter> & {
  filterKey: KeysOfType<TFilter, TData | null>,
  titleI18nNamespace: TNamespace,
  titleI18nKey: I18nMessageKeysOfNamespace<TNamespace>,
  ids: TId[],
  idToButton: (id: TId) => React.ReactNode,
  idToItemId: (id: TId) => string,
  getClassNames: (isActive: boolean) => string,
  highlight?: boolean,
};
