import React from 'react';

import ArrowUpRightIcon from '@heroicons/react/24/outline/ArrowUpRightIcon';
import {clsx} from 'clsx';

import {InfoIcon} from '@/components/icons/info';
import {Flex} from '@/components/layout/flex/common';
import {FlexLink} from '@/components/layout/flex/link';
import {MealMakerRecipePartsProps} from '@/ui/cooking/make/recipe/parts/type';


export const MealMakerRecipeTitle = ({
  filter,
  meal,
  mealName,
  mealsReady,
  isMealMakeable,
}: MealMakerRecipePartsProps) => {
  const isInventoryEnabled = Object.values(filter.inventory)
    .some((count) => count != null);

  return (
    <Flex direction="row" className="justify-between">
      <Flex direction="row" className="gap-1 truncate">
        {mealsReady >= 2 && <InfoIcon>{Math.floor(mealsReady)}</InfoIcon>}
        <div className={clsx(
          'truncate text-sm',
          isInventoryEnabled && !isMealMakeable && 'text-slate-400 dark:text-slate-600',
        )}>
          {mealName}
        </div>
      </Flex>
      <FlexLink href={`/meal/${meal.id}`} className="button-clickable-bg h-5 w-5 p-1" target="_blank">
        <ArrowUpRightIcon/>
      </FlexLink>
    </Flex>
  );
};
