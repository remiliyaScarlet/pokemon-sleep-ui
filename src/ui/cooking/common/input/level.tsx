import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {FilterWithUpdaterProps} from '@/components/input/filter/type';
import {LevelIcon} from '@/components/shared/icon/lv';
import {NumberInputRequired} from '@/components/shared/input/number/required/main';
import {recipeMaxLevel} from '@/const/game/meal';
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

  const t = useTranslations('UI.InPage.Cooking');

  return (
    <NumberInputRequired
      text={<LevelIcon alt={t('RecipeLevel')}/>}
      textClassName={clsx(
        'text-xs text-slate-500 group-hover:text-slate-400 dark:text-slate-400 dark:group-hover:text-slate-500',
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
      } satisfies CookingCommonFilter))}
      className={className}
    />
  );
};
