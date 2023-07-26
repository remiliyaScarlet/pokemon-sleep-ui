import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterInputRow} from '@/components/input/filter/inputRow';
import {FilterCategoryInputProps} from '@/components/input/filter/type';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex';
import {I18nNamespaces} from '@/types/i18n';


export const FilterCategoryInput = <
  TFilter,
  TData,
  TId,
  TNamespace extends I18nNamespaces
>({
  filter,
  setFilter,
  filterKey,
  titleI18nNamespace,
  titleI18nKey,
  ids,
  idToItemId,
  idToButton,
  getClassNames,
  highlight,
}: FilterCategoryInputProps<TFilter, TData, TId, TNamespace>) => {
  const t = useTranslations(titleI18nNamespace);

  return (
    <FilterInputRow highlight={highlight}>
      <div className="w-32 whitespace-nowrap text-center text-sm">
        {t(titleI18nKey)}
      </div>
      <Flex direction="row" className="gap-1" wrap>
        {ids.map((id) => (
          <ToggleButton
            key={`${titleI18nKey}-${idToItemId(id)}`}
            active={filter[filterKey] === id}
            id={`${titleI18nKey}-${idToItemId(id)}`}
            onClick={() => setFilter((original) => ({
              ...original,
              [filterKey]: original[filterKey] === id ? null : id,
            }))}
            className={getClassNames(filter[filterKey] === id)}
          >
            {idToButton(id)}
          </ToggleButton>
        ))}
      </Flex>
    </FilterInputRow>
  );
};
