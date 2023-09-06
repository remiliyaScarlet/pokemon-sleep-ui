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
  const {meal} = props;
  const {id, type} = meal;

  const t = useTranslations('Game.Food');

  const mealName = t(id.toString());

  return (
    <Link href={`/meal/${id}`} className={clsx(
      'relative flex h-20 w-full flex-col items-end rounded-lg',
      mealTypeBackgroundStyle[type],
    )}>
      <div className="relative h-20 w-20 opacity-40">
        <NextImage src={`/images/meal/portrait/${id}.png`} alt={mealName} sizes={imageIconSizes}/>
      </div>
      <Flex direction="col" className="absolute left-0 top-0 z-10 h-full justify-between p-1.5">
        <div className="text-shadow-preset truncate text-left">
          {mealName}
        </div>
        <Flex direction="col" noFullWidth>
          <MealLinkDetail {...props}/>
        </Flex>
      </Flex>
    </Link>
  );
};
