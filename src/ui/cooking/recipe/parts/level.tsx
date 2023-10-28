import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {LevelInput} from '@/components/shared/input/levelInput';
import {recipeMaxLevel} from '@/const/game/meal';
import {CookingRecipePartsProps} from '@/ui/cooking/recipe/parts/type';
import {CookingFilter} from '@/ui/cooking/type';


export const CookingRecipeLevel = ({meal, filter, setFilter}: CookingRecipePartsProps) => {
  const {recipeLevel} = filter;
  const {id} = meal;

  const t = useTranslations('UI.InPage.Cooking');

  return (
    <LevelInput
      id={`recipeLevel-${id}`}
      text={t('RecipeLevel')}
      textClassName={clsx(
        'self-end text-xs',
        'text-slate-500 group-hover:text-slate-400 dark:text-slate-400 dark:group-hover:text-slate-500',
      )}
      level={recipeLevel[id] ?? 1}
      minLevel={1}
      maxLevel={recipeMaxLevel}
      setLevel={(level) => setFilter((original) => ({
        ...original,
        recipeLevel: {
          ...original.recipeLevel,
          [id]: Math.min(level || 1, recipeMaxLevel),
        },
      } satisfies CookingFilter))}
    />
  );
};
