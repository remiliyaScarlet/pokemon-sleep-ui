import React from 'react';

import {Flex} from '@/components/layout/flex';
import potCapacity from '@/data/potCapacity.json';
import {Meal} from '@/types/mongo/meal';
import {PotInfoFilter} from '@/ui/info/pot/type';
import {PotRecipeUnlockSection} from '@/ui/info/pot/unlockSection';
import {getMealRequiredQuantity} from '@/utils/game/meal';


type Props = Pick<PotInfoFilter, 'capacity' | 'showEmpty'> & {
  meals: Meal[]
};

export const PotRecipeUnlockTable = ({capacity, showEmpty, meals}: Props) => {
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
    <Flex direction="col" center className="gap-1.5">
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
            return <React.Fragment key={potInfo.capacity}/>;
          }

          return (
            <PotRecipeUnlockSection
              key={potInfo.capacity}
              capacity={capacity}
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
