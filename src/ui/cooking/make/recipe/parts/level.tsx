import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {NumberInputRequired} from '@/components/shared/input/number/required/main';
import {recipeMaxLevel} from '@/const/game/meal';
import {MealMakerRecipePartsProps} from '@/ui/cooking/make/recipe/parts/type';
import {MealMakerFilter} from '@/ui/cooking/make/type';


export const MealMakerRecipeLevel = ({meal, filter, setFilter}: MealMakerRecipePartsProps) => {
  const {recipeLevel} = filter;
  const {id} = meal;

  const t = useTranslations('UI.InPage.Cooking');

  return (
    <NumberInputRequired
      id={`recipeLevel-${id}`}
      text={t('RecipeLevel')}
      textClassName={clsx(
        'self-end text-xs',
        'text-slate-500 group-hover:text-slate-400 dark:text-slate-400 dark:group-hover:text-slate-500',
      )}
      value={recipeLevel[id] ?? 1}
      min={1}
      max={recipeMaxLevel}
      setValue={(level) => setFilter((original) => ({
        ...original,
        recipeLevel: {
          ...original.recipeLevel,
          [id]: level,
        },
      } satisfies MealMakerFilter))}
    />
  );
};
