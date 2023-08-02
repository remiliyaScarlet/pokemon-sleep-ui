import React from 'react';

import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {MealLink} from '@/components/shared/meal/link';
import {imageSmallIconSizes} from '@/styles/image';
import {Meal} from '@/types/mongo/meal';
import {PotInfoFilter, PotLevelInfo} from '@/ui/info/pot/type';
import {formatInt} from '@/utils/number';
import {classNames} from '@/utils/react';


type Props = Pick<PotInfoFilter, 'capacity'> & {
  cumulativeCost: number,
  potInfo: PotLevelInfo,
  meals: Meal[],
  unlockedRecipes: number,
};

export const PotRecipeUnlockSection = ({capacity, cumulativeCost, potInfo, meals, unlockedRecipes}: Props) => {
  const t = useTranslations('UI.InPage.Info.Pot');

  return (
    <Flex direction="col" className="button-bg gap-1.5 rounded-lg p-2 md:flex-row md:items-center">
      <Flex direction="row" center noFullWidth className="gap-1.5 md:w-1/6 md:flex-col">
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
            <Flex direction="row" className="gap-1 md:flex-col">
              <div>{formatInt(cumulativeCost)}</div>
              <div>(+{formatInt(potInfo.cost)})</div>
            </Flex> :
            <div>-</div>}
        </Flex>
        <Flex direction="row" center noFullWidth className="gap-1">
          <div className="relative h-7 w-7">
            <NextImage src="/images/generic/meal.png" alt={t('UnlockedRecipes')} sizes={imageSmallIconSizes}/>
          </div>
          <div>{unlockedRecipes} (+{meals.length})</div>
        </Flex>
      </Flex>
      <HorizontalSplitter className="block md:hidden"/>
      <Flex direction="row" wrap className="gap-1.5">
        {meals.length ?
          meals
            .map((meal) => (
              <div
                key={meal.id}
                className={classNames(
                  'relative width-with-gap-sm width-with-gap-2-items',
                  'sm:width-with-gap-3-items md:width-with-gap-4-items lg:width-with-gap-5-items',
                )}
              >
                <MealLink meal={meal} small/>
              </div>
            )) :
          <div className="m-auto h-10 w-10">
            <XMarkIcon/>
          </div>}
      </Flex>
    </Flex>
  );
};
