import React from 'react';

import Bars3BottomLeftIcon from '@heroicons/react/24/solid/Bars3BottomLeftIcon';
import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/text';
import {Flex} from '@/components/layout/flex';
import {sortTypeToI18nId} from '@/components/shared/pokemon/sorter/const';
import {PokemonSortType, pokemonSortType} from '@/components/shared/pokemon/sorter/type';


type Props = {
  sort: PokemonSortType,
  updateSort: (sort: PokemonSortType) => void,
};

export const PokemonSortingFilter = ({sort, updateSort}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex');

  return (
    <FilterTextInput
      onClick={(sort) => updateSort(sort)}
      isActive={(sortOfInput) => sortOfInput === sort}
      title={
        <Flex direction="row" center>
          <div className="h-6 w-6">
            <Bars3BottomLeftIcon/>
          </div>
        </Flex>
      }
      ids={[...pokemonSortType]}
      idToButton={(sort) => t(sortTypeToI18nId[sort])}
      idToItemId={(sort) => `sortType-${sort}`}
    />
  );
};
