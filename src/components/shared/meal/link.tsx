import React from 'react';

import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {MealLinkDetail} from '@/components/shared/meal/linkDetail';
import {MealLinkProps} from '@/components/shared/meal/type';
import {mealTypeBackgroundStyle} from '@/styles/classes';
import {imageIconSizes} from '@/styles/image';
import {classNames} from '@/utils/react';


export const MealLink = ({meal}: MealLinkProps) => {
  const {id, type} = meal;
  const t = useTranslations('Game.Food');

  const mealName = t(id.toString());

  // These 2 `<Flex>` need to be outside `<Link>` to avoid `<a>` in `<a>` DOM tree issue
  return (
    <>
      <Flex direction="col" noFullWidth className="absolute bottom-1 left-1 z-10 gap-0.5 text-sm">
        <MealLinkDetail meal={meal}/>
      </Flex>
      <Flex
        direction="row" noFullWidth
        className="text-shadow-preset absolute left-1 top-1 z-10 items-center gap-0.5 whitespace-nowrap"
      >
        {mealName}
      </Flex>
      <Link
        href={`/meal/${id}`}
        className={classNames('group inline-block h-full w-full rounded-lg', mealTypeBackgroundStyle[type])}
      >
        <Flex direction="row" className="h-full items-center justify-end gap-1.5">
          <div className="relative h-16 w-16 opacity-40">
            <NextImage src={`/images/meal/portrait/${id}.png`} alt={mealName} sizes={imageIconSizes}/>
          </div>
        </Flex>
      </Link>
    </>
  );
};
