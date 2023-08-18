import React from 'react';

import {Flex} from '@/components/layout/flex';
import {CookingCookable} from '@/ui/cooking/cookable';
import {CookingCommonProps, MealEnergyData} from '@/ui/cooking/type';
import {getMealEnergyInfo} from '@/utils/game/meal';


type Props = Omit<CookingCommonProps, 'setFilter'>;

export const CookingResult = ({filter, meals, ingredientMap}: Props) => {
  const mealEnergyInfo: MealEnergyData[] = React.useMemo(
    () => meals.map((meal) => ({
      meal,
      energyInfo: getMealEnergyInfo({
        meal,
        ingredientMap,
        level: filter.recipeLevel[meal.id] ?? 1,
      }),
    })),
    [meals, ingredientMap, filter],
  );

  return (
    <Flex direction="row" wrap center className="gap-1.5">
      {mealEnergyInfo
        .sort((a, b) => (b.energyInfo.atLevel.energy ?? 0) - (a.energyInfo.atLevel.energy ?? 0))
        .map((mealEnergyData) => (
          <CookingCookable
            key={mealEnergyData.meal.id}
            ingredientCount={filter.ingredientCount}
            {...mealEnergyData}
          />
        ))}
    </Flex>
  );
};
