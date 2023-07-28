import React from 'react';

import {Flex} from '@/components/layout/flex';
import {IngredientIcons} from '@/components/shared/food/ingredientIcons';
import {MealLinkProps} from '@/ui/meal/index/type';
import {getMealRequiredQuantity} from '@/utils/game/meal';


export const MealLinkDetail = (meal: MealLinkProps) => {
  return (
    <Flex direction="row" className="items-end gap-0.5 text-xs">
      <Flex direction="row" noFullWidth center className="info-in-image text-shadow-preset h-6 w-6">
        {getMealRequiredQuantity(meal)}
      </Flex>
      <IngredientIcons meal={meal}/>
    </Flex>
  );
};
