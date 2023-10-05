'use client';
import React from 'react';

import {clsx} from 'clsx';
import {Session} from 'next-auth';

import {AdsUnit} from '@/components/ads/main';
import {Grid} from '@/components/layout/grid';
import {MealLink} from '@/components/shared/meal/link';
import {Meal} from '@/types/game/meal';
import {useFilteredMeals} from '@/ui/meal/index/hook';
import {MealInput} from '@/ui/meal/index/input/main';
import {toSum} from '@/utils/array';


type Props = {
  data: Meal[],
  session: Session | null,
};

export const MealIndexClient = ({data, session}: Props) => {
  const preloaded = session?.user.preloaded.cooking;

  const mealFilterProps = useFilteredMeals({
    data,
    preloaded,
  });
  const {isIncluded, filter} = mealFilterProps;

  return (
    <>
      <MealInput data={data} preloaded={preloaded} {...mealFilterProps}/>
      <AdsUnit/>
      <Grid className="grid-cols-1 gap-1.5 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
        {data
          .map((meal) => ({
            meal,
            totalIngredientCount: toSum(meal.ingredients.map(({quantity}) => quantity)),
          }))
          .sort((a, b) => {
            if (a.meal.type > b.meal.type) {
              return 1;
            }
            if (a.meal.type < b.meal.type) {
              return -1;
            }

            if (a.totalIngredientCount > b.totalIngredientCount) {
              return -1;
            }
            if (a.totalIngredientCount < b.totalIngredientCount) {
              return 1;
            }

            return 0;
          })
          .map(({meal}) => (
            <div key={meal.id} className={clsx(!isIncluded[meal.id] && 'hidden')}>
              <MealLink meal={meal} mealLevel={filter.mealLevel} showEnergy={filter.showEnergy}/>
            </div>
          ))}
      </Grid>
      <AdsUnit/>
    </>
  );
};
