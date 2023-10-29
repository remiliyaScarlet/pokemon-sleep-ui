import React from 'react';

import {CookingInputIngredientCounter} from '@/ui/cooking/common/input/ingredients';
import {MealPreparerCommonProps, MealPreparerFilter} from '@/ui/cooking/prepare/type';


export const MealPreparerInventory = ({filter, setFilter, ingredientMap}: MealPreparerCommonProps) => {
  return (
    <CookingInputIngredientCounter
      ingredientMap={ingredientMap}
      counter={filter.inventory}
      showIngredient={() => true}
      onValueChanged={({id}, count) => setFilter((original) => ({
        ...original,
        inventory: {
          ...original.inventory,
          [id]: count,
        },
      } satisfies MealPreparerFilter))}
    />
  );
};
