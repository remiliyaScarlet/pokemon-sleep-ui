import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {imageIconSizes} from '@/styles/image';
import {CookingRecipeLayoutProps} from '@/ui/cooking/type';


type Props = CookingRecipeLayoutProps & {
  mealName: string
};

export const CookingRecipeContent = ({
  imageDimension,
  clickable,
  mealId,
  icon,
  markGray,
  mealName,
  children,
}: React.PropsWithChildren<Props>) => {
  return (
    <div className={clsx(
      'button-toggle-inactive-bg relative w-full rounded-lg', clickable && 'button-clickable',
    )}>
      <Flex direction="col" className="absolute left-0 top-0 z-10 h-full justify-between p-1.5">
        <Flex direction="row" className="gap-1">
          {icon}
          <div className={clsx('truncate text-left text-sm', markGray && 'text-slate-400 dark:text-slate-600')}>
            {mealName}
          </div>
        </Flex>
        {children}
      </Flex>
      <Flex direction="col" className="items-end">
        <div className={clsx('relative', imageDimension)}>
          <NextImage
            src={`/images/meal/portrait/${mealId}.png`} alt={mealName} className="opacity-40" sizes={imageIconSizes}
          />
        </div>
      </Flex>
    </div>
  );
};
