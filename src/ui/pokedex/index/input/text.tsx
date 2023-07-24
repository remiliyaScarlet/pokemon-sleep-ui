import React from 'react';

import {PokedexCategoryInput} from '@/ui/pokedex/index/input/category';
import {toggleClass} from '@/ui/pokedex/index/input/const';
import {PokedexCategoryInputProps} from '@/ui/pokedex/index/input/type';
import {PokedexFilter} from '@/ui/pokedex/index/type';
import {classNames} from '@/utils/react';
import {KeysOfType} from '@/utils/type';


type Props<T, K extends KeysOfType<PokedexFilter, T | null>> = Omit<
  PokedexCategoryInputProps<T, K>,
  'getClassNames'
>;

export const PokedexTextInput = <T, K extends KeysOfType<PokedexFilter, T | null>>(props: Props<T, K>) => {
  return (
    <PokedexCategoryInput
      getClassNames={(isActive) => classNames(
        'relative h-8 px-2 rounded-full whitespace-nowrap text-sm',
        isActive ? toggleClass.active.hover : toggleClass.inactive.hover,
        isActive ? toggleClass.active.background : toggleClass.inactive.background,
      )}
      {...props}
    />
  );
};
