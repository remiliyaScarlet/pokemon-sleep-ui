import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {MealLinkDetail} from '@/components/shared/meal/linkDetail';
import {MealLinkProps} from '@/components/shared/meal/type';
import {mealTypeBackgroundStyle} from '@/styles/classes';
import {imageIconSizes} from '@/styles/image';


export const MealLink = (props: MealLinkProps) => {
  const {meal, small} = props;
  const {id, type} = meal;

  const t = useTranslations('Game.Food');

  const mealName = t(id.toString());

  return (
    <Link href={`/meal/${id}`} className={clsx(
      'relative flex w-full flex-col items-end rounded-lg',
      small ? 'h-16' : 'h-20',
      mealTypeBackgroundStyle[type],
    )}>
      <div className={clsx('relative opacity-40', small ? 'h-16 w-16' : 'h-20 w-20')}>
        <NextImage src={`/images/meal/portrait/${id}.png`} alt={mealName} sizes={imageIconSizes}/>
      </div>
      <Flex direction="col" className="absolute left-0 top-0 z-10 h-full justify-between p-1.5">
        <div className={clsx('text-shadow-preset truncate text-left', small && 'text-sm')}>
          {mealName}
        </div>
        <Flex direction="col" noFullWidth>
          <MealLinkDetail {...props}/>
        </Flex>
      </Flex>
    </Link>
  );
};
