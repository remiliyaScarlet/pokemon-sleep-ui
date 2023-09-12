import React from 'react';

import {FilterInputProps} from '@/components/input/filter/type';
import {getMultiSelectOnClickProps, getSingleSelectOnClickProps} from '@/components/input/filter/utils/props';
import {IngredientInput} from '@/components/shared/input/ingredient';
import {MealTypeInput} from '@/components/shared/input/mealType';
import {PotCapacityInput} from '@/components/shared/input/potCapacity';
import {MealDisplayControl} from '@/components/shared/meal/control';
import {MealLevelSlider} from '@/components/shared/meal/levelSlider';
import {defaultCookingPreset} from '@/const/user/cooking';
import {MealTypeId} from '@/types/game/meal';
import {PotInfoCommonProps, PotInfoFilter} from '@/ui/info/pot/type';


type Props = FilterInputProps<PotInfoFilter> & Pick<PotInfoCommonProps, 'preloaded' | 'ingredients'> & {
  maxMealLevel: number,
  mealTypes: MealTypeId[],
};

export const PotInfoInput = ({filter, setFilter, maxMealLevel, mealTypes, preloaded, ingredients}: Props) => {
  return (
    <>
      <MealTypeInput
        mealTypes={mealTypes}
        {...getMultiSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'mealType',
        })}
      />
      <MealLevelSlider
        level={filter.mealLevel}
        maxLevel={maxMealLevel}
        setLevel={(mealLevel) => setFilter((original) => ({...original, mealLevel}))}
      />
      <IngredientInput
        ingredientIds={Object.keys(ingredients).map((id) => Number(id))}
        {...getMultiSelectOnClickProps({
          filter: filter,
          setFilter: setFilter,
          filterKey: 'ingredients',
        })}
      />
      <PotCapacityInput
        {...getSingleSelectOnClickProps({
          filter: filter,
          setFilter: setFilter,
          filterKey: 'capacity',
        })}
      />
      <MealDisplayControl
        showEnergy={filter.showEnergy}
        setShowEnergy={(showEnergy) => setFilter((original) => ({
          ...original,
          showEnergy,
        } satisfies PotInfoFilter))}
        uploadData={{
          ...defaultCookingPreset,
          ...preloaded,
          ...(filter.capacity && {
            potCapacity: filter.capacity,
          }),
        }}
      />
    </>
  );
};
