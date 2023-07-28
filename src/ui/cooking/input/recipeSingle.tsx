import React from 'react';

import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {Slider} from '@/components/input/slider';
import {Flex} from '@/components/layout/flex';
import {Meal} from '@/types/mongo/meal';
import {CookingRecipeLayout} from '@/ui/cooking/recipeLayout';
import {CookingCommonProps} from '@/ui/cooking/type';


type Props = Omit<CookingCommonProps, 'meals'> & {
  data: Meal,
};

export const CookingInputRecipeSingle = ({input, setInput, data}: Props) => {
  const {id, levels} = data;
  const t = useTranslations('UI.InPage.Cooking');

  const recipeLevel = input.recipeLevel[id] ?? 1;

  const setLevel = (level: number) => {
    setInput((original) => ({
      ...original,
      recipeLevel: {
        ...original.recipeLevel,
        [id]: level || 1,
      },
    }));
  };

  return (
    <CookingRecipeLayout mealId={id} imageSizeClass="h-20 w-20">
      <Flex direction="row" className="items-center gap-1.5">
        <Flex direction="col" className="w-14" noFullWidth>
          <div className="whitespace-nowrap text-xs text-slate-500 dark:text-slate-400">
            {t('RecipeLevel')}
          </div>
          <InputBox
            id={`capacity-${id}`}
            type="number"
            step="1"
            min="1"
            className="text-center text-sm"
            value={recipeLevel}
            onChange={({target}) => setLevel(Number(target.value))}
          />
        </Flex>
        <div className="w-full self-end">
          <Slider
            id={`capacity-${id}-slider`}
            min="1"
            max={levels.length}
            value={recipeLevel}
            setValue={(newValue) => setLevel(newValue)}
          />
        </div>
      </Flex>
    </CookingRecipeLayout>
  );
};
