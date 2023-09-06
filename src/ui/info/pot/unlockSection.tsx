import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {Grid} from '@/components/layout/grid';
import {NextImage} from '@/components/shared/common/image/main';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {MealLink} from '@/components/shared/meal/link';
import {imageSmallIconSizes} from '@/styles/image';
import {Meal} from '@/types/game/meal';
import {PotInfoFilter, PotLevelInfo} from '@/ui/info/pot/type';
import {formatInt} from '@/utils/number';


type Props = {
  filter: PotInfoFilter,
  cumulativeCost: number,
  potInfo: PotLevelInfo,
  meals: Meal[],
  unlockedRecipes: number,
};

export const PotRecipeUnlockSection = ({filter, cumulativeCost, potInfo, meals, unlockedRecipes}: Props) => {
  const {mealLevel, capacity, displayType} = filter;

  const t = useTranslations('UI.InPage.Info.Pot');

  return (
    <Flex direction="col" className="button-bg gap-1.5 rounded-lg p-2 md:flex-row md:items-center">
      <Flex direction="row" center noFullWidth className="gap-1.5 md:w-48 md:flex-col">
        <Flex direction="row" center noFullWidth className="gap-1">
          <div className="relative h-7 w-7">
            <NextImage src="/images/generic/pot.png" alt={t('Capacity')} sizes={imageSmallIconSizes}/>
          </div>
          <div>{potInfo.capacity}</div>
        </Flex>
        <Flex direction="row" center noFullWidth className="gap-1">
          <div className="relative h-7 w-7">
            <NextImage src="/images/generic/shard.png" alt={t('Expand')} sizes={imageSmallIconSizes}/>
          </div>
          {!capacity || capacity < potInfo.capacity ?
            <Flex direction="col" noFullWidth className="gap-0.5">
              <div>{formatInt(cumulativeCost)}</div>
              <div className="text-xs">(+{formatInt(potInfo.cost)})</div>
            </Flex> :
            <div>-</div>}
        </Flex>
        <Flex direction="row" center noFullWidth className="gap-1">
          <div className="relative h-7 w-7">
            <NextImage src="/images/generic/meal.png" alt={t('UnlockedRecipes')} sizes={imageSmallIconSizes}/>
          </div>
          <Flex direction="col" noFullWidth className="gap-0.5">
            <div>{unlockedRecipes}</div>
            <div className="text-xs">(+{meals.length})</div>
          </Flex>
        </Flex>
      </Flex>
      <HorizontalSplitter className="block md:hidden"/>
      {meals.length ?
        <Grid className={clsx(
          'grid-cols-1 gap-1.5 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
          '2xl:grid-cols-7',
        )}>
          {meals.map((meal) => (
            <MealLink key={meal.id} meal={meal} mealLevel={mealLevel} displayType={displayType}/>
          ))}
        </Grid> :
        <Grid>
          <div className="m-auto h-10 w-10">
            <XCircleIcon/>
          </div>
        </Grid>}
    </Flex>
  );
};
