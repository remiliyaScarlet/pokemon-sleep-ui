import React from 'react';

import {InputRow} from '@/components/input/filter/row';
import {FilterWithUpdaterProps} from '@/components/input/filter/type';
import {getMultiSelectOnClickProps, getSingleSelectOnClickProps} from '@/components/input/filter/utils/props';
import {IngredientInput} from '@/components/shared/input/ingredient';
import {MealTypeInput} from '@/components/shared/input/mealType';
import {PotCapacityInput} from '@/components/shared/input/potCapacity';
import {MealDisplayControl} from '@/components/shared/meal/control';
import {MealLevelInput} from '@/components/shared/meal/level';
import {defaultCookingPreset} from '@/const/user/cooking';
import {MealTypeId} from '@/types/game/meal/main';
import {UserPreloadedData} from '@/types/userData/main';
import {PotInfoDataProps, PotInfoFilter} from '@/ui/info/pot/type';


type Props = FilterWithUpdaterProps<PotInfoFilter> & Pick<PotInfoDataProps, 'ingredientMap'> & {
  preloaded: UserPreloadedData['cooking'],
  maxMealLevel: number,
  mealTypes: MealTypeId[],
};

export const PotInfoInput = ({filter, setFilter, maxMealLevel, mealTypes, preloaded, ingredientMap}: Props) => {
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
      <InputRow className="px-2 py-1">
        <MealLevelInput
          value={filter.mealLevel}
          max={maxMealLevel}
          setValue={(mealLevel) => setFilter((original) => ({...original, mealLevel}))}
        />
      </InputRow>
      <IngredientInput
        ingredientIds={Object.keys(ingredientMap).map((id) => Number(id))}
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
