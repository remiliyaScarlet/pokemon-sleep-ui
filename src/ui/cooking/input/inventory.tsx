import React from 'react';

import {isFilterConditionActive} from '@/components/input/filter/utils/check';
import {CookingInputIngredients} from '@/ui/cooking/input/ingredients';
import {CookingCommonProps} from '@/ui/cooking/type';


export const CookingInputInventory = ({filter, setFilter, ingredientMap}: CookingCommonProps) => {
  return (
    <CookingInputIngredients
      ingredientMap={ingredientMap}
      ingredientCount={filter.ingredientCount}
      showIngredient={(ingredient) => !(
        isFilterConditionActive({filter, filterKey: 'ingredient'}) &&
        !filter.ingredient[ingredient.id]
      )}
      onValueChanged={({id}, count) => setFilter((original) => ({
        ...original,
        ingredientCount: {
          ...original.ingredientCount,
          [id]: count,
        },
      }))}
    />
  );
};
