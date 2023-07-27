import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {mealTypeBackgroundStyle, textShadow} from '@/styles/classes';
import {imageIconSizes} from '@/styles/image';
import {MealLinkDetail} from '@/ui/meal/index/linkDetail';
import {MealLinkProps} from '@/ui/meal/index/type';
import {classNames} from '@/utils/react';


export const MealLink = (props: MealLinkProps) => {
  const {id, type} = props;
  const t = useTranslations('Game.Food');

  const mealName = t(id.toString());

  return (
    <Link
      href={`/meal/${id}`}
      className={classNames('group inline-block h-full w-full rounded-lg', mealTypeBackgroundStyle[type])}
    >
      <Flex direction="row" className="h-full items-center justify-end gap-1.5">
        <Flex
          direction="row"
          className={classNames(
            'absolute left-1 top-1 z-10 whitespace-nowrap items-center gap-0.5',
            textShadow,
          )}
        >
          {mealName}
        </Flex>
        <Flex direction="col" className="absolute bottom-1 left-1 z-10 gap-0.5 text-sm">
          <MealLinkDetail {...props}/>
        </Flex>
        <div className="relative h-16 w-16 opacity-40">
          <Image
            src={`/images/meal/portrait/${id}.png`} alt={mealName}
            fill sizes={imageIconSizes}
          />
        </div>
      </Flex>
    </Link>
  );
};
