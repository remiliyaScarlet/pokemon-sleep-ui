import React from 'react';

import {Flex} from '@/components/layout/flex';
import {IngredientIcons} from '@/components/shared/food/ingredientIcons';
import {textShadow} from '@/styles/classes';
import {MealLinkProps} from '@/ui/meal/index/type';
import {getMealRequiredQuantity} from '@/utils/game/meal';
import {classNames} from '@/utils/react';


export const MealLinkDetail = (meal: MealLinkProps) => {
  return (
    <Flex direction="row" className="items-end gap-0.5 text-xs">
      <Flex
        direction="row" noFullWidth center
        className={classNames('rounded-full bg-slate-400/70 dark:bg-slate-500/70 w-6 h-6', textShadow)}
      >
        {getMealRequiredQuantity(meal)}
      </Flex>
      <IngredientIcons meal={meal}/>
    </Flex>
  );
};
