import React from 'react';

import {isFilterConditionActive} from '@/components/input/filter/utils/check';
import {MealMakerInputIngredients} from '@/ui/cooking/make/input/ingredients';
import {MealMakerCommonProps} from '@/ui/cooking/make/type';


export const MealMakerInputInventory = ({filter, setFilter, ingredientMap}: MealMakerCommonProps) => {
  return (
    <MealMakerInputIngredients
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
