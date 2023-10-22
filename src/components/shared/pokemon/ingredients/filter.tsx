import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterIconInput} from '@/components/input/filter/icon';
import {FilterCategoryInputProps} from '@/components/input/filter/type';
import {IngredientId} from '@/types/game/ingredient';
import {IngredientChainMap, IngredientLevel} from '@/types/game/pokemon/ingredient';
import {toUnique} from '@/utils/array';


type Props = Pick<FilterCategoryInputProps<IngredientId>, 'style' | 'isActive' | 'onClick' | 'title'> & {
  idPrefix?: string,
  ingredientChainMap: IngredientChainMap,
  level: IngredientLevel,
};

export const PokemonIngredientFilter = ({idPrefix, ingredientChainMap, level, ...props}: Props) => {
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
      ids={possibleIngredientsAtLevel}
      {...props}
    />
  );
};
