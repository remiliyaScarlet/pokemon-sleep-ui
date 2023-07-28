import React from 'react';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

import {toggleClass} from '@/components/input/filter/const';
import {Flex} from '@/components/layout/flex';
import {imageIconSizes} from '@/styles/image';
import {CookingRecipeLayoutProps} from '@/ui/cooking/type';
import {classNames} from '@/utils/react';


export const CookingRecipeContent = ({
  clickable,
  mealId,
  imageSizeClass,
  children,
}: React.PropsWithChildren<CookingRecipeLayoutProps>) => {
  const t = useTranslations('Game.Food');

  const mealName = t(mealId.toString());

  return (
    <Flex
      direction="col"
      className={classNames(
        clickable ? 'button-clickable' : undefined,
        toggleClass.inactive.background,
        'relative items-end rounded-lg',
      )}
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
