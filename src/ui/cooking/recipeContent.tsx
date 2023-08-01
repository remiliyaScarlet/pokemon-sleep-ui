import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
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
        'button-toggle-inactive-bg relative items-end rounded-lg',
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
        <NextImage
          src={`/images/meal/portrait/${mealId}.png`} alt={mealName} className="opacity-40" sizes={imageIconSizes}
        />
      </div>
    </Flex>
  );
};
