import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import potCapacity from '@/data/potCapacity.json';
import {Meal} from '@/types/game/meal';
import {PotInfoFilter} from '@/ui/info/pot/type';
import {PotRecipeUnlockSection} from '@/ui/info/pot/unlockSection';
import {getMealRequiredQuantity} from '@/utils/game/meal';


type Props = & {
  filter: PotInfoFilter,
  meals: Meal[]
};

export const PotRecipeUnlockTable = ({filter, meals}: Props) => {
  const {capacity, showEmpty} = filter;
  const sortedMeals = meals.sort((a, b) => {
    const diff = getMealRequiredQuantity(a) - getMealRequiredQuantity(b);

    if (diff !== 0) {
      return diff;
    }

    return a.id - b.id;
  });
  let mealCursorIdx = 0;
  let cumulativeCost = 0;

  return (
    <Flex center className="gap-1.5">
      {potCapacity
        .sort((a, b) => a.level - b.level)
        .map((potInfo) => {
          const unlockedMeals: Meal[] = [];
          let currentMeal: Meal | undefined = sortedMeals[mealCursorIdx];

          while (currentMeal && getMealRequiredQuantity(currentMeal) <= potInfo.capacity) {
            unlockedMeals.push(currentMeal);

            mealCursorIdx++;
            currentMeal = sortedMeals[mealCursorIdx];
          }

          if (!capacity || potInfo.capacity > capacity) {
            cumulativeCost += potInfo.cost;
          }

          if (!showEmpty && capacity && (!unlockedMeals.length || potInfo.capacity <= capacity)) {
            return null;
          }

          return (
            <PotRecipeUnlockSection
              key={potInfo.capacity}
              filter={filter}
              cumulativeCost={cumulativeCost}
              potInfo={potInfo}
              meals={unlockedMeals}
              unlockedRecipes={mealCursorIdx}
            />
          );
        })}
    </Flex>
  );
};
