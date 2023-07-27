import React from 'react';

import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {Flex} from '@/components/layout/flex';
import {Meal} from '@/types/mongo/meal';
import {CookingRecipeLayout} from '@/ui/cooking/recipeLayout';
import {CookingCommonProps} from '@/ui/cooking/type';


type Props = Omit<CookingCommonProps, 'meals'> & {
  data: Meal,
};

export const CookingInputRecipeSingle = ({input, setInput, data}: Props) => {
  const {id} = data;
  const t = useTranslations('UI.InPage.Cooking');

  return (
    <CookingRecipeLayout mealId={id} imageSizeClass="h-16 w-16">
      <Flex direction="row" className="items-center gap-1.5">
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {t('RecipeLevel')}
        </div>
        <InputBox
          id="capacity"
          type="number"
          step="1"
          min="1"
          className="w-10 text-center"
          value={input.recipeLevel[id] ?? 1}
          onChange={(e) => setInput((original) => ({
            ...original,
            recipeLevel: {
              ...original.recipeLevel,
              [id]: Number(e.target.value),
            },
          }))}
        />
      </Flex>
    </CookingRecipeLayout>
  );
};
