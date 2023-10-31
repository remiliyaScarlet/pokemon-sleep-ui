'use client';
import React from 'react';

import {useSession} from 'next-auth/react';

import {defaultCookingPreset} from '@/const/user/cooking';
import {useCalculatedUserSettings} from '@/hooks/userData/settings/calculated';
import {usePossibleMealTypes} from '@/ui/cooking/common/hook/mealType';
import {CookingServerDataProps} from '@/ui/cooking/common/type';
import {generateCookingCommonFilter} from '@/ui/cooking/common/utils/main';
import {useMealPreparerInfo} from '@/ui/cooking/prepare/hook/main';
import {MealPreparerInput} from '@/ui/cooking/prepare/input/main';
import {MealPreparerByMealTypes} from '@/ui/cooking/prepare/mealType/main';
import {MealPreparerSummary} from '@/ui/cooking/prepare/summary/main';
import {MealPreparerCommonProps, MealPreparerFilter} from '@/ui/cooking/prepare/type';
import {cloneMerge} from '@/utils/object/cloneMerge';


export const MealPreparerClient = (props: CookingServerDataProps) => {
  const {meals, preloaded} = props;

  const {data: session} = useSession();
  const {calculatedSettings} = useCalculatedUserSettings({
    server: preloaded.settings,
    client: session?.user.preloaded.settings,
  });
  const [filter, setFilter] = React.useState<MealPreparerFilter>({
    ...generateCookingCommonFilter(preloaded.cooking),
    mealsWanted: cloneMerge(defaultCookingPreset.mealsWanted, preloaded.cooking?.mealsWanted) ?? {},
  });

  const mealTypes = usePossibleMealTypes(meals);

  const commonProps: MealPreparerCommonProps = {
    ...props,
    filter,
    setFilter,
    mealTypes,
    calculatedSettings,
    preloaded: preloaded.cooking,
  };

  const info = useMealPreparerInfo(commonProps);

  return (
    <>
      <MealPreparerInput {...commonProps}/>
      <MealPreparerByMealTypes info={info} {...commonProps}/>
      <MealPreparerSummary info={info} inventory={filter.inventory}/>
    </>
  );
};
