'use client';
import React from 'react';

import {useSession} from 'next-auth/react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {useCalculatedUserSettings} from '@/hooks/userData/settings/calculated';
import {useCookingFilter} from '@/ui/cooking/hook';
import {CookingInputUI} from '@/ui/cooking/input/main';
import {CookingRecipe} from '@/ui/cooking/recipe/main';
import {CookingCommonProps, CookingServerDataProps} from '@/ui/cooking/type';
import {toUnique} from '@/utils/array';


export const CookingClient = (props: CookingServerDataProps) => {
  const {
    meals,
    ingredientMap,
    preloaded,
  } = props;

  const {
    filter,
    setFilter,
    isIncluded,
  } = useCookingFilter(props);
  const {data: session} = useSession();
  const {calculatedSettings} = useCalculatedUserSettings({
    server: preloaded.settings,
    client: session?.user.preloaded.settings,
  });

  const validMeals = React.useMemo(() => meals.filter(({id}) => isIncluded[id]), [filter]);
  const mealTypes = toUnique(meals.map(({type}) => type));

  const commonProps: CookingCommonProps = {
    filter,
    setFilter,
    meals: validMeals,
    mealTypes,
    ingredientMap,
    calculatedSettings,
    preloaded: preloaded.cooking,
  };

  return (
    <Flex className="gap-1">
      <CookingInputUI {...commonProps}/>
      <AdsUnit/>
      <CookingRecipe {...commonProps}/>
      <AdsUnit/>
    </Flex>
  );
};
