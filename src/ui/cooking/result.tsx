import React from 'react';

import {clsx} from 'clsx';

import {Grid} from '@/components/layout/grid';
import {CookingCookable} from '@/ui/cooking/cookable';
import {CookingCommonProps, MealEnergyData} from '@/ui/cooking/type';
import {getMealEnergyInfo} from '@/utils/game/meal';


type Props = Omit<CookingCommonProps, 'setFilter'>;

export const CookingResult = ({filter, meals, ingredientMap}: Props) => {
  const {showUnmakeableRecipe} = filter;

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
    <Grid className={clsx(
      'grid-cols-1 gap-1.5 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
      '2xl:grid-cols-7',
    )}>
      {mealEnergyInfo
        .sort((a, b) => (b.energyInfo.atLevel.energy ?? 0) - (a.energyInfo.atLevel.energy ?? 0))
        .map((mealEnergyData) => (
          <CookingCookable
            key={mealEnergyData.meal.id}
            ingredientCount={filter.ingredientCount}
            showUnmakeableRecipe={showUnmakeableRecipe}
            {...mealEnergyData}
          />
        ))}
    </Grid>
  );
};
