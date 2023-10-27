import React from 'react';

import {Grid} from '@/components/layout/grid';
import {CookingCookable} from '@/ui/cooking/cookable';
import {CookingCommonProps, CookingRecipeData} from '@/ui/cooking/type';
import {getMealFinalStrength} from '@/utils/game/meal/main';


type Props = Omit<CookingCommonProps, 'setFilter'>;

export const CookingResult = ({filter, meals, ingredientMap, calculatedSettings}: Props) => {
  const {showUnmakeableRecipe} = filter;

  const data: CookingRecipeData[] = React.useMemo(
    () => meals.map((meal) => ({
      meal,
      info: getMealFinalStrength({
        filler: [],
        level: filter.recipeLevel[meal.id] ?? 1,
        meal,
        ingredientMap,
        mapBonus: calculatedSettings.bonus.map,
      }),
    })),
    [filter, meals, ingredientMap, calculatedSettings],
  );

  return (
    <Grid className="grid-cols-1 gap-1.5 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
      {data
        .sort((a, b) => (b.info.strengthFinal ?? 0) - (a.info.strengthFinal ?? 0))
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
