import React from 'react';

import {getMultiSelectOnClickProps, getSingleSelectOnClickProps} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex';
import {IngredientInput} from '@/components/shared/input/ingredient';
import {MealTypeInput} from '@/components/shared/input/mealType';
import {PotCapacityInput} from '@/components/shared/input/potCapacity';
import potCapacity from '@/data/potCapacity.json';
import {Meal} from '@/types/mongo/meal';
import {MealIndexInputProps} from '@/ui/meal/index/input/type';
import {toUnique} from '@/utils/array';


type Props = MealIndexInputProps & {
  data: Meal[],
};

export const MealInput = (props: Props) => {
  const {data, filter, setFilter} = props;

  return (
    <Flex direction="col" className="gap-1.5">
      <MealTypeInput
        mealTypes={toUnique(data.map(({type}) => type)).sort((a, b) => a - b)}
        {...getMultiSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'mealType',
        })}
      />
      <IngredientInput
        ingredientIds={toUnique(data.flatMap(({ingredients}) => ingredients.map(({id}) => id))).sort((a, b) => a - b)}
        {...getMultiSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'ingredient',
        })}
      />
      <PotCapacityInput
        capacityPossibilities={toUnique(potCapacity.map(({capacity}) => capacity)).sort((a, b) => a - b)}
        {...getSingleSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'ingredientCountCap',
        })}
      />
    </Flex>
  );
};
