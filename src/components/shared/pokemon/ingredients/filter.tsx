import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterIconInput} from '@/components/input/filter/icon';
import {FilterCategoryInputProps} from '@/components/input/filter/type';
import {PokemonInputFilterIdType, PokemonInputType} from '@/components/shared/pokemon/filter/type';
import {IngredientChainMap, IngredientLevel} from '@/types/game/pokemon/ingredient';
import {toUnique} from '@/utils/array';


type Props<
  TDisplayType extends PokemonInputType,
  TId extends PokemonInputFilterIdType[TDisplayType],
> = Pick<FilterCategoryInputProps<TId>, 'style' | 'isActive' | 'onClick' | 'title'> & {
  idPrefix?: string,
  ingredientChainMap: IngredientChainMap,
  level: IngredientLevel,
};

export const PokemonIngredientFilter = <
  TDisplayType extends PokemonInputType,
  TId extends PokemonInputFilterIdType[TDisplayType],
>({idPrefix, ingredientChainMap, level, ...props}: Props<TDisplayType, TId>) => {
  const t = useTranslations('Game');

  const possibleIngredientsAtLevel = toUnique(Object.values(ingredientChainMap)
    .flatMap(({ingredients}) => ingredients[level])
    .map(({id}) => id))
    .sort((a, b) => a - b);

  return (
    <FilterIconInput
      idToItemId={(id) => `${idPrefix}Ingredient@${level}-${id}`}
      idToAlt={(id) => t(`Food.${id}`)}
      idToImageSrc={(id) => `/images/ingredient/${id}.png`}
      ids={possibleIngredientsAtLevel as TId[]}
      {...props}
    />
  );
};
