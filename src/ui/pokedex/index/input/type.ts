import React from 'react';

import {I18nMessageKeysOfObject} from '@/types/i18n';
import {PokedexFilter} from '@/ui/pokedex/index/type';
import {KeysOfType} from '@/utils/type';


export type PokedexInputProps = {
  filter: PokedexFilter,
  setFilter: React.Dispatch<React.SetStateAction<PokedexFilter>>,
};

export type PokedexCategoryInputProps<T, K extends KeysOfType<PokedexFilter, T | null>> = PokedexInputProps & {
  filterKey: K,
  titleI18nKey: I18nMessageKeysOfObject<IntlMessages['UI']['InPage']['Pokedex']['Info']>,
  ids: T[],
  idToButton: (id: T) => React.ReactNode,
  idToItemId: (id: T) => string,
  getClassNames: (isActive: boolean) => string,
  highlight?: boolean,
};
