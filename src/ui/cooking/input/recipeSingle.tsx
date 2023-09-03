import React from 'react';

import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {Slider} from '@/components/input/slider';
import {Flex} from '@/components/layout/flex';
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
      <Flex direction="row" className="items-center gap-1.5">
        <Flex direction="col" className="w-14" noFullWidth>
          <div className="whitespace-nowrap text-xs text-slate-500 dark:text-slate-400">
            {t('RecipeLevel')}
          </div>
          <InputBox
            id={`recipeLevel-${id}`}
            type="number"
            step="1"
            min="1"
            max={maxLevel}
            className="text-center text-sm"
            value={recipeLevel}
            onChange={({target}) => setLevel(Number(target.value))}
          />
        </Flex>
        <div className="hidden w-full self-end md:block">
          <Slider
            id={`recipeLevel-${id}-slider`}
            min="1"
            max={maxLevel}
            value={recipeLevel}
            setValue={(newValue) => setLevel(newValue)}
          />
        </div>
      </Flex>
    </CookingRecipeLayout>
  );
};
