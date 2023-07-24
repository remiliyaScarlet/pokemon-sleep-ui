import React from 'react';

import {useTranslations} from 'next-intl';

import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex';
import {PokedexCategoryInputProps} from '@/ui/pokedex/index/input/type';
import {PokedexFilter} from '@/ui/pokedex/index/type';
import {KeysOfType} from '@/utils/type';


export const PokedexCategoryInput = <T, K extends KeysOfType<PokedexFilter, T | null>>({
  filter,
  setFilter,
  filterKey,
  titleI18nKey,
  ids,
  idToItemId,
  idToButton,
  getClassNames,
}: PokedexCategoryInputProps<T, K>) => {
  const t = useTranslations('UI.InPage.Pokedex.Input');

  return (
    <Flex direction="row" className="items-center gap-1 rounded-lg bg-slate-50/40 p-1 dark:bg-slate-700/25">
      <div className="w-32 whitespace-nowrap text-center text-sm">
        {t(titleI18nKey)}
      </div>
      <Flex direction="row" className="gap-1" wrap>
        {ids.map((id) => (
          <ToggleButton
            key={`${titleI18nKey}-${idToItemId(id)}`}
            active={filter[filterKey] === id}
            id={`${titleI18nKey}-${idToItemId(id)}`}
            onChange={() => setFilter((original) => ({
              ...original,
              [filterKey]: original[filterKey] === id ? null : id,
            }))}
            className={getClassNames(filter[filterKey] === id)}
          >
            {idToButton(id)}
          </ToggleButton>
        ))}
      </Flex>
    </Flex>
  );
};
