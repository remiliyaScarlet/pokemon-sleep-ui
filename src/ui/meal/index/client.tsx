'use client';
import React from 'react';

import {Flex} from '@/components/layout/flex';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {Meal} from '@/types/mongo/meal';
import {useFilteredMeals} from '@/ui/meal/index/hook';
import {MealInput} from '@/ui/meal/index/input/main';
import {MealLink} from '@/ui/meal/index/link';
import {toSum} from '@/utils/array';
import {classNames} from '@/utils/react';


type Props = {
  data: Meal[],
};

export const MealIndexClient = ({data}: Props) => {
  const props = useFilteredMeals({data});
  const {isIncluded} = props;

  return (
    <>
      <MealInput data={data} {...props}/>
      <HorizontalSplitter/>
      <Flex direction="row" wrap className="gap-1.5 md:p-3 lg:p-5">
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
            <div
              key={meal.id}
              className={classNames(
                'relative width-with-gap',
                'sm:width-with-gap-2-items md:width-with-gap-3-items',
                'lg:width-with-gap-4-items xl:width-with-gap-5-items',
                isIncluded[meal.id] ? undefined : 'hidden',
              )}
            >
              <MealLink {...meal}/>
            </div>
          ))}
      </Flex>
    </>
  );
};
