import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {LevelIcon} from '@/components/shared/icon/lv';
import {NumberInputRequired} from '@/components/shared/input/number/required/main';
import {recipeMaxLevel} from '@/const/game/meal';


type Props = {
  level: number,
  onUpdate: (updated: number) => void,
  className?: string,
};

export const MealRecipeLevelInput = ({level, onUpdate, className}: Props) => {
  const t = useTranslations('UI.InPage.Cooking');

  return (
    <NumberInputRequired
      text={<LevelIcon alt={t('RecipeLevel')}/>}
      textClassName={clsx(
        'text-xs text-slate-500 group-hover:text-slate-400 dark:text-slate-400 dark:group-hover:text-slate-500',
      )}
      value={level}
      min={1}
      max={recipeMaxLevel}
      setValue={(level) => onUpdate(level)}
      className={className}
    />
  );
};
