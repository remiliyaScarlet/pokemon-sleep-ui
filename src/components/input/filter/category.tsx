import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterInputRow} from '@/components/input/filter/inputRow';
import {FilterCategoryInputProps} from '@/components/input/filter/type';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex';
import {I18nNamespaces} from '@/types/i18n';


export const FilterCategoryInput = <TId, TNamespace extends I18nNamespaces>({
  titleI18nNamespace,
  titleI18nKey,
  ids,
  idToItemId,
  idToButton,
  onClick,
  isActive,
  getClassNames,
  style,
}: FilterCategoryInputProps<TId, TNamespace>) => {
  const t = useTranslations(titleI18nNamespace);

  return (
    <FilterInputRow style={style}>
      <div className="w-32 whitespace-nowrap text-center text-sm">
        {t(titleI18nKey)}
      </div>
      <Flex direction="row" className="gap-1" wrap>
        {ids.map((id) => {
          const active = isActive(id);

          return (
            <ToggleButton
              key={`${titleI18nKey}-${idToItemId(id)}`}
              active={active}
              id={`${titleI18nKey}-${idToItemId(id)}`}
              onClick={() => onClick(id)}
              className={getClassNames(active)}
            >
              {idToButton(id)}
            </ToggleButton>
          );
        })}
      </Flex>
    </FilterInputRow>
  );
};
