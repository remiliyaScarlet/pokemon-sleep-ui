import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {NextImage} from '@/components/shared/common/image/main';
import {imagePortraitSizes} from '@/styles/image';
import {Dimension} from '@/types/style';


type Props = {
  mealId: number,
  dimension: Dimension,
  isAbsolute?: boolean,
  className?: string,
};

export const MealImage = ({mealId, dimension, isAbsolute, className}: Props) => {
  const t = useTranslations('Game.Food');

  const mealName = t(mealId.toString());

  return (
    <div className={clsx(dimension, isAbsolute ? 'absolute' : 'relative', className)}>
      <NextImage src={`/images/meal/portrait/${mealId}.png`} alt={mealName} sizes={imagePortraitSizes}/>
    </div>
  );
};
