import React from 'react';

import {useTranslations} from 'next-intl';

import {LevelInput} from '@/components/shared/input/levelInput';
import {Meal} from '@/types/game/meal';
import {CookingRecipeLayout} from '@/ui/cooking/recipeLayout';
import {CookingCommonProps} from '@/ui/cooking/type';


type Props = Omit<CookingCommonProps, 'meals'> & {
  data: Meal,
};

export const CookingInputRecipeSingle = ({filter, setFilter, data}: Props) => {
  const {id, levels} = data;
  const t = useTranslations('UI.InPage.Cooking');

  const recipeLevel = filter.recipeLevel[id] ?? 1;
  const maxLevel = levels.length;

  const setLevel = (level: number) => {
    setFilter((original) => ({
      ...original,
      recipeLevel: {
        ...original.recipeLevel,
        [id]: Math.min(level || 1, maxLevel),
      },
    } satisfies CookingCommonProps['filter']));
  };

  return (
    <CookingRecipeLayout mealId={id} imageDimension="h-20 w-20" clickable={false}>
      <LevelInput
        id={`recipeLevel-${id}`}
        text={t('RecipeLevel')}
        textClassName="text-xs text-slate-500 dark:text-slate-400 self-end"
        level={recipeLevel}
        minLevel={1}
        maxLevel={maxLevel}
        setLevel={setLevel}
      />
    </CookingRecipeLayout>
  );
};
