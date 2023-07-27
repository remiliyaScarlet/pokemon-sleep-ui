'use client';
import React from 'react';

import {Flex} from '@/components/layout/flex';
import {Meal} from '@/types/mongo/meal';
import {useFilteredMeals} from '@/ui/meal/index/hooks';
import {MealInput} from '@/ui/meal/index/input/main';
import {MealLink} from '@/ui/meal/index/link';
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
      <hr className="border-t-gray-700"/>
      <Flex direction="row" wrap className="gap-1.5 md:p-3 lg:p-5">
        {data.map((meal) => (
          <div
            key={meal.id}
            className={classNames(
              'relative width-with-gap xs:width-with-gap-2-items',
              'sm:width-with-gap-3-items md:width-with-gap-4-items',
              'lg:width-with-gap-5-items xl:width-with-gap-6-items',
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
