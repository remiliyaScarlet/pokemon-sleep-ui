import React from 'react';

import {Grid} from '@/components/layout/grid';
import {CookingRecipeSingle} from '@/ui/cooking/recipe/single';
import {CookingCommonProps, CookingRecipeData} from '@/ui/cooking/type';
import {getMealFinalStrength} from '@/utils/game/meal/main';


export const CookingRecipe = ({meals, ingredientMap, calculatedSettings, ...props}: CookingCommonProps) => {
  const {filter} = props;
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
    <Grid className="grid-cols-1 gap-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
      {data
        .sort((a, b) => (b.info.strengthFinal ?? 0) - (a.info.strengthFinal ?? 0))
        .map((mealEnergyData) => (
          <CookingRecipeSingle
            key={mealEnergyData.meal.id}
            showUnmakeableRecipe={showUnmakeableRecipe}
            {...mealEnergyData}
            {...props}
          />
        ))}
    </Grid>
  );
};
