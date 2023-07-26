import React from 'react';

import {FilterCategoryInput} from '@/components/input/filter/category';
import {FilterCategoryInputProps} from '@/components/input/filter/type';
import {getFilterInputButtonClass} from '@/components/input/filter/utils';
import {I18nNamespaces} from '@/types/i18n';


type Props<TId, TNamespace extends I18nNamespaces> = Omit<
  FilterCategoryInputProps<TId, TNamespace>,
  'getClassNames'
>;

export const FilterTextInput = <TId, TNamespace extends I18nNamespaces>(props: Props<TId, TNamespace>) => {
  return (
    <FilterCategoryInput
      getClassNames={getFilterInputButtonClass}
      {...props}
    />
  );
};
