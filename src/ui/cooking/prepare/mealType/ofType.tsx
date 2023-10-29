import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {InputRowWithTitle} from '@/components/input/filter/rowWithTitle';
import {CollapsibleFull} from '@/components/layout/collapsible/full';
import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {IngredientIcons} from '@/components/shared/meal/ingredients/icons';
import {mealTypeBorderStyle, mealTypeDotStyle, mealTypeTextStyle} from '@/styles/game/mealType';
import {Meal, MealTypeId} from '@/types/game/meal/main';
import {useMealPreparerInfoOfMealType} from '@/ui/cooking/prepare/mealType/hook';
import {MealPreparerRecipe} from '@/ui/cooking/prepare/mealType/recipe';
import {MealPreparerMealTypeStatsUI} from '@/ui/cooking/prepare/mealType/stats';
import {MealPreparerCommonProps} from '@/ui/cooking/prepare/type';
import {toProducingItemFromIngredientCounter} from '@/utils/game/cooking';


type Props = MealPreparerCommonProps & {
  mealsOfType: Meal[],
  mealType: MealTypeId,
};

export const MealPrepareOfMealType = ({mealsOfType, mealType, ...props}: Props) => {
  const t = useTranslations('Game.MealType');
  const t2 = useTranslations('UI.InPage.Cooking');

  const info = useMealPreparerInfoOfMealType({
    ...props,
    mealsOfType,
  });
  const collapsible = useCollapsible(true);

  const {missing, filler, required} = info.ingredients;

  return (
    <Flex className={clsx('info-section gap-2 border', mealTypeBorderStyle[mealType])}>
      <CollapsibleFull state={collapsible} button={
        <Flex direction="row" center className="gap-1 text-xl">
          <div className={clsx('h-5 w-5 rounded-full', mealTypeDotStyle[mealType])}/>
          <div className={mealTypeTextStyle[mealType]}>{t(mealType.toString())}</div>
        </Flex>
      }>
        <Grid className={clsx(
          'grid-cols-1 gap-1 rounded-lg p-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5',
        )}>
          {mealsOfType.map((meal) => <MealPreparerRecipe key={meal.id} meal={meal} info={info} {...props}/>)}
        </Grid>
      </CollapsibleFull>
      <HorizontalSplitter className={mealTypeBorderStyle[mealType]}/>
      <InputRowWithTitle title={t2('Ingredient.Missing')} className="min-h-[2.5rem]">
        <IngredientIcons
          getMark={() => 'red'}
          dimension="h-6 w-6"
          textSizeClassName="text-lg"
          ingredients={toProducingItemFromIngredientCounter(missing)}
          className="flex-wrap justify-center"
        />
      </InputRowWithTitle>
      <InputRowWithTitle title={t2('Ingredient.Filler')} className="min-h-[2.5rem]">
        <IngredientIcons
          getMark={() => 'green'}
          dimension="h-6 w-6"
          textSizeClassName="text-lg"
          ingredients={toProducingItemFromIngredientCounter(filler)}
          className="flex-wrap justify-center"
        />
      </InputRowWithTitle>
      <InputRowWithTitle title={t2('Ingredient.Required')} className="min-h-[2.5rem]">
        <IngredientIcons
          dimension="h-6 w-6"
          textSizeClassName="text-lg"
          ingredients={toProducingItemFromIngredientCounter(required)}
          className="flex-wrap justify-center"
        />
      </InputRowWithTitle>
      <MealPreparerMealTypeStatsUI stats={info.stats}/>
    </Flex>
  );
};
