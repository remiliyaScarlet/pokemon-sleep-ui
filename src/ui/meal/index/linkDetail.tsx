import React from 'react';

import {Flex} from '@/components/layout/flex';
import {IngredientIcons} from '@/components/shared/food/ingredientIcons';
import {iconInfoStyle, textShadow} from '@/styles/classes';
import {MealLinkProps} from '@/ui/meal/index/type';
import {getMealRequiredQuantity} from '@/utils/game/meal';
import {classNames} from '@/utils/react';


export const MealLinkDetail = (meal: MealLinkProps) => {
  return (
    <Flex direction="row" className="items-end gap-0.5 text-xs">
      <Flex
        direction="row" noFullWidth center
        className={classNames('w-6 h-6', iconInfoStyle, textShadow)}
      >
        {getMealRequiredQuantity(meal)}
      </Flex>
      <IngredientIcons meal={meal}/>
    </Flex>
  );
};
