import React from 'react';

import {InputRow} from '@/components/input/filter/row';
import {getMultiSelectOnClickProps, getSingleSelectOnClickProps} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex';
import {IngredientInput} from '@/components/shared/input/ingredient';
import {MealTypeInput} from '@/components/shared/input/mealType';
import {PotCapacityInput} from '@/components/shared/input/potCapacity';
import {MealDisplayControl} from '@/components/shared/meal/control';
import {MealLevelInput} from '@/components/shared/meal/level';
import {defaultCookingPreset} from '@/const/user/cooking';
import {Meal} from '@/types/game/meal';
import {UserPreloadedData} from '@/types/userData/main';
import {MealIndexInputProps} from '@/ui/meal/index/input/type';
import {MealFilter} from '@/ui/meal/index/type';
import {toUnique} from '@/utils/array';


type Props = MealIndexInputProps & {
  data: Meal[],
  preloaded: UserPreloadedData['cooking'],
};

export const MealInput = ({data, filter, setFilter, preloaded}: Props) => {
  return (
    <Flex direction="col" className="gap-1">
      <MealTypeInput
        mealTypes={toUnique(data.map(({type}) => type)).sort((a, b) => a - b)}
        {...getMultiSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'mealType',
        })}
      />
      <InputRow className="px-2 py-1">
        <MealLevelInput
          level={filter.mealLevel}
          maxLevel={Math.max(...data.map((meal) => Math.max(...meal.levels.map(({lv}) => lv))))}
          setLevel={(mealLevel) => setFilter((original) => ({...original, mealLevel}))}
        />
      </InputRow>
      <PotCapacityInput
        {...getSingleSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'potCapacity',
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
      <MealDisplayControl
        showEnergy={filter.showEnergy}
        setShowEnergy={(showEnergy) => setFilter((original) => ({
          ...original,
          showEnergy,
        } satisfies MealFilter))}
        uploadData={{
          ...defaultCookingPreset,
          ...preloaded,
          ingredients: filter.ingredient,
          showEnergy: filter.showEnergy,
          ...(filter.potCapacity && {
            potCapacity: filter.potCapacity,
          }),
        }}
      />
    </Flex>
  );
};
