'use client';
import React from 'react';

import {Session} from 'next-auth';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {IngredientMap} from '@/types/game/ingredient';
import {Meal} from '@/types/game/meal/main';
import {useCookingFilter} from '@/ui/cooking/hook';
import {CookingInputUI} from '@/ui/cooking/input/main';
import {CookingResult} from '@/ui/cooking/result';
import {CookingCommonProps} from '@/ui/cooking/type';
import {toUnique} from '@/utils/array';


type Props = {
  meals: Meal[],
  ingredientMap: IngredientMap,
  session: Session | null,
};

export const CookingClient = ({meals, ingredientMap, session}: Props) => {
  const {filter, setFilter, isIncluded} = useCookingFilter({
    meals,
    session,
  });

  const validMeals = React.useMemo(() => meals.filter(({id}) => isIncluded[id]), [filter]);
  const mealTypes = toUnique(meals.map(({type}) => type));

  const props: CookingCommonProps = {
    filter,
    setFilter,
    meals: validMeals,
    mealTypes,
    ingredientMap,
    preloaded: session?.user.preloaded.cooking,
  };

  return (
    <Flex className="gap-1">
      <CookingInputUI {...props}/>
      <AdsUnit/>
      <CookingResult {...props}/>
      <AdsUnit/>
    </Flex>
  );
};
