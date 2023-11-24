import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {MealSelector} from '@/components/shared/meal/selector/main';
import {mealTypeBorderStyle, mealTypeTextStyle} from '@/styles/game/mealType';
import {MealTypeId} from '@/types/game/meal/main';
import {userCookingMeals} from '@/types/userData/cooking';
import {mealOfDayIcon} from '@/ui/base/navbar/userSettings/sections/cooking/const';
import {UserSettingsCookingCommonProps} from '@/ui/base/navbar/userSettings/sections/cooking/type';


type Props = UserSettingsCookingCommonProps & {
  mealType: MealTypeId,
};

export const UserCookingByMealType = ({cookingPreset, setCookingPreset, mealMap, mealType}: Props) => {
  const {target} = cookingPreset;

  const t = useTranslations('Game');

  return (
    <Flex className={clsx('gap-1.5 rounded-lg border p-1.5', mealTypeBorderStyle[mealType])}>
      <div className={clsx('px-1 text-left', mealTypeTextStyle[mealType])}>
        {t(`MealType.${mealType}`)}
      </div>
      <Flex className="gap-1.5 lg:flex-row">
        {userCookingMeals.map((mealOfDay) => {
          const targetOfType = target[mealType];

          return (
            <Flex direction="row" key={mealOfDay} className="items-center gap-1.5">
              <div className="h-8 w-8 shrink-0">
                {mealOfDayIcon[mealOfDay]}
              </div>
              <MealSelector
                current={targetOfType ? targetOfType[mealOfDay] : undefined}
                mealMap={mealMap}
                mealType={mealType}
                isMealOption={({type}) => type === mealType}
                onSelect={(meal) => setCookingPreset({
                  target: {[mealType]: {[mealOfDay]: meal ? meal.id : null}},
                })}
              />
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};
