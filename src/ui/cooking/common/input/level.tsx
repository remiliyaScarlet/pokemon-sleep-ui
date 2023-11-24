import React from 'react';

import {FilterWithUpdaterProps} from '@/components/input/filter/type';
import {MealRecipeLevelInput} from '@/components/shared/meal/recipeLevel';
import {Meal} from '@/types/game/meal/main';
import {CookingCommonFilter} from '@/ui/cooking/common/type';


type Props<TFilter extends CookingCommonFilter> = FilterWithUpdaterProps<TFilter> & {
  meal: Meal,
  className?: string,
};

export const CookingInputRecipeLevel = <TFilter extends CookingCommonFilter>({
  meal,
  filter,
  setFilter,
  className,
}: Props<TFilter>) => {
  const {recipeLevel} = filter;
  const {id} = meal;

  return (
    <MealRecipeLevelInput
      level={recipeLevel[id] ?? 1}
      onUpdate={(level) => setFilter((original) => ({
        ...original,
        recipeLevel: {
          ...original.recipeLevel,
          [id]: level,
        },
      } satisfies CookingCommonFilter))}
      className={className}
    />
  );
};
