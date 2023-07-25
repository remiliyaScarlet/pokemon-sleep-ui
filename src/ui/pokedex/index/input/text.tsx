import React from 'react';

import {PokedexCategoryInput} from '@/ui/pokedex/index/input/category';
import {PokedexCategoryInputProps} from '@/ui/pokedex/index/input/type';
import {getPokedexInputButtonClass} from '@/ui/pokedex/index/input/utils';
import {PokedexFilter} from '@/ui/pokedex/index/type';
import {KeysOfType} from '@/utils/type';


type Props<T, K extends KeysOfType<PokedexFilter, T | null>> = Omit<
  PokedexCategoryInputProps<T, K>,
  'getClassNames'
>;

export const PokedexTextInput = <T, K extends KeysOfType<PokedexFilter, T | null>>(props: Props<T, K>) => {
  return (
    <PokedexCategoryInput
      getClassNames={getPokedexInputButtonClass}
      {...props}
    />
  );
};
