import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {InfoIcon} from '@/components/icons/info';
import {FlexButton} from '@/components/layout/flex/button';
import {Flex} from '@/components/layout/flex/common';
import {MealImage} from '@/components/shared/meal/image';
import {IngredientIconsFromMeal} from '@/components/shared/meal/ingredients/iconsFromMeal';
import {mealTypeBackgroundStyle} from '@/styles/game/mealType';
import {Meal, MealTypeId} from '@/types/game/meal/main';
import {getMealIngredientCount} from '@/utils/game/meal/count';


type Props = {
  meal: Meal | undefined,
  mealType: MealTypeId,
  onClick: () => void,
};

export const MealSelectorOption = ({meal, mealType, onClick}: Props) => {
  const t = useTranslations('Game');

  return (
    <FlexButton noFullWidth={false} onClick={onClick} center className={clsx(
      'relative h-14 rounded-lg p-1.5',
      mealTypeBackgroundStyle[mealType],
    )}>
      {meal ?
        <>
          <MealImage mealId={meal.id} dimension="h-12 w-12" isAbsolute className="bottom-1 right-1 opacity-40"/>
          <Flex className="gap-1">
            <div className="text-shadow-preset truncate text-left text-sm">
              {t(`Food.${meal.id}`)}
            </div>
            <Flex noFullWidth direction="row" className="items-end gap-0.5 text-xs">
              <InfoIcon dimension="h-5 w-5">
                {getMealIngredientCount(meal)}
              </InfoIcon>
              <IngredientIconsFromMeal meal={meal}/>
            </Flex>
          </Flex>
        </> :
        <XCircleIcon className="h-8 w-8"/>}
    </FlexButton>
  );
};
