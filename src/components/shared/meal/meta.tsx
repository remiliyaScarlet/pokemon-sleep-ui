import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {mealTypeTextStyle} from '@/styles/game/mealType';
import {imagePortraitSizes} from '@/styles/image';
import {Meal} from '@/types/game/meal/main';


type Props = {
  meal: Meal,
  className?: string,
};

export const MealMeta = ({meal, className}: Props) => {
  const {id, type} = meal;

  const t = useTranslations('Game.Food');

  const mealName = t(id.toString());

  return (
    <Flex center noFullWidth className={clsx('gap-2', className)}>
      <div className={clsx('text-lg', mealTypeTextStyle[type])}>
        {mealName}
      </div>
      <div className="relative h-44 w-44 rounded-lg border border-slate-300 dark:border-slate-700">
        <NextImage src={`/images/meal/portrait/${id}.png`} alt={mealName} sizes={imagePortraitSizes}/>
      </div>
    </Flex>
  );
};
