import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {MealPrepareOfMealType} from '@/ui/cooking/prepare/mealType/ofType';
import {MealPreparerCommonProps} from '@/ui/cooking/prepare/type';


export const MealPreparerByMealTypes = (props: MealPreparerCommonProps) => {
  const {meals, mealTypes} = props;

  return (
    <Flex className="gap-2">
      {mealTypes.map((mealType) => (
        <React.Fragment key={mealType}>
          <AdsUnit/>
          <MealPrepareOfMealType
            mealType={mealType}
            mealsOfType={meals.filter(({type, ingredients}) => type === mealType && !!ingredients.length)}
            {...props}
          />
        </React.Fragment>
      ))}
    </Flex>
  );
};
