import React from 'react';

import {getMultiSelectOnClickProps, getSingleSelectOnClickProps} from '@/components/input/filter/utils/props';
import {IngredientInput} from '@/components/shared/input/ingredient';
import {MealTypeInput} from '@/components/shared/input/mealType';
import {PotCapacityInput} from '@/components/shared/input/potCapacity';
import potCapacity from '@/data/potCapacity.json';
import {CookingCommonProps} from '@/ui/cooking/type';
import {toUnique} from '@/utils/array';


export const CookingInputGeneral = ({mealTypes, ingredients, filter, setFilter}: CookingCommonProps) => {
  return (
    <>
      <MealTypeInput
        mealTypes={mealTypes}
        {...getSingleSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'type',
        })}
      />
      <PotCapacityInput
        capacityPossibilities={toUnique(potCapacity.map(({capacity}) => capacity)).sort((a, b) => a - b)}
        {...getSingleSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'capacity',
        })}
      />
      <IngredientInput
        ingredientIds={Object.keys(ingredients).map((id) => Number(id))}
        {...getMultiSelectOnClickProps({
          filter: filter,
          setFilter: setFilter,
          filterKey: 'ingredient',
        })}
      />
    </>
  );
};
