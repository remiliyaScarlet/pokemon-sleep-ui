'use client';
import React from 'react';

import merge from 'lodash/merge';
import {Session} from 'next-auth';

import {useFilterInput} from '@/components/input/filter/hook';
import {isFilterIncludingAllOfData} from '@/components/input/filter/utils/check';
import {Flex} from '@/components/layout/flex';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {useUpdateUserData} from '@/hooks/auth';
import {IngredientMap} from '@/types/mongo/ingredient';
import {Meal, MealId} from '@/types/mongo/meal';
import {CookingInputUI} from '@/ui/cooking/input/main';
import {CookingResult} from '@/ui/cooking/result';
import {CookingCommonProps, CookingFilter} from '@/ui/cooking/type';
import {toUnique} from '@/utils/array';
import {getMealRequiredQuantity} from '@/utils/game/meal';


type Props = {
  meals: Meal[],
  ingredientMap: IngredientMap,
  session: Session | null,
};

export const CookingClient = ({meals, ingredientMap, session}: Props) => {
  const {filter, setFilter, isIncluded} = useFilterInput<CookingFilter, Meal, MealId>({
    data: meals,
    dataToId: ({id}) => id,
    initialFilter: {
      type: 1,
      recipeLevel: merge({}, session?.user.data?.recipeLevel),
      capacity: 15,
      ingredient: {},
    },
    isDataIncluded: (filter, meal) => {
      if (filter.type !== meal.type) {
        return false;
      }

      if (!isFilterIncludingAllOfData({
        filter,
        filterKey: 'ingredient',
        ids: meal.ingredients.map(({id}) => id),
      })) {
        return false;
      }

      return getMealRequiredQuantity(meal) <= filter.capacity;
    },
  });
  useUpdateUserData({type: 'recipeLevel', data: filter.recipeLevel});

  const validMeals = React.useMemo(() => meals.filter(({id}) => isIncluded[id]), [filter]);
  const mealTypes = toUnique(meals.map(({type}) => type));

  const props: CookingCommonProps = {filter, setFilter, meals: validMeals, mealTypes, ingredientMap};

  return (
    <Flex direction="col">
      <CookingInputUI {...props}/>
      <HorizontalSplitter className="my-2"/>
      <CookingResult {...props}/>
    </Flex>
  );
};
