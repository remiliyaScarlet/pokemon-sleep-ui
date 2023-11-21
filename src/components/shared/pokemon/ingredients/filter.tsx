import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterIconInput} from '@/components/input/filter/icon';
import {FilterCategoryInputProps} from '@/components/input/filter/type';
import {IngredientId} from '@/types/game/ingredient';
import {IngredientChainMap, IngredientLevel} from '@/types/game/pokemon/ingredient';
import {toUnique} from '@/utils/array';


type Props = Pick<FilterCategoryInputProps<IngredientId>, 'style' | 'isActive' | 'onClick' | 'title'> & {
  ingredientChainMap: IngredientChainMap,
  level: IngredientLevel,
};

export const PokemonIngredientFilter = ({ingredientChainMap, level, ...props}: Props) => {
  const t = useTranslations('Game');

  const possibleIngredientsAtLevel = toUnique(Object.values(ingredientChainMap)
    .flatMap(({ingredients}) => ingredients[level])
    .map(({id}) => id))
    .sort((a, b) => a - b);

  return (
    <FilterIconInput
      idToAlt={(id) => t(`Food.${id}`)}
      idToImageSrc={(id) => `/images/ingredient/${id}.png`}
      ids={possibleIngredientsAtLevel}
      {...props}
    />
  );
};
