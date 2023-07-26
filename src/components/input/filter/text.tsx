import React from 'react';

import {FilterCategoryInput} from '@/components/input/filter/category';
import {FilterCategoryInputProps} from '@/components/input/filter/type';
import {getFilterInputButtonClass} from '@/components/input/filter/utils';
import {I18nNamespaces} from '@/types/i18n';


type Props<TFilter, TData, TId, TNamespace extends I18nNamespaces> = Omit<
  FilterCategoryInputProps<TFilter, TData, TId, TNamespace>,
  'getClassNames'
>;

export const FilterTextInput = <
  TFilter,
  TData,
  TId,
  TNamespace extends I18nNamespaces
>(props: Props<TFilter, TData, TId, TNamespace>) => {
  return (
    <FilterCategoryInput
      getClassNames={getFilterInputButtonClass}
      {...props}
    />
  );
};
