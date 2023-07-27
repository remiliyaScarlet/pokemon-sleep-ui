import React from 'react';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

import {toggleClass} from '@/components/input/filter/const';
import {Flex} from '@/components/layout/flex';
import {imageIconSizes} from '@/styles/image';
import {classNames} from '@/utils/react';


type Props = {
  mealId: number,
  imageSizeClass: string,
};

export const CookingRecipeLayout = ({mealId, imageSizeClass, children}: React.PropsWithChildren<Props>) => {
  const t = useTranslations('Game.Food');

  const mealName = t(mealId.toString());

  return (
    <Flex
      direction="col"
      className={classNames('relative items-end rounded-lg', toggleClass.inactive.background)}
    >
      <Flex direction="col" className="absolute left-0 top-0 z-10 h-full p-1.5">
        <div className="whitespace-nowrap text-left text-sm">
          {mealName}
        </div>
        <div className="mt-auto">
          {children}
        </div>
      </Flex>
      <div className={classNames('relative', imageSizeClass)}>
        <Image
          src={`/images/meal/portrait/${mealId}.png`} alt={mealName} className="opacity-40"
          fill sizes={imageIconSizes}
        />
      </div>
    </Flex>
  );
};
