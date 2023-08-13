import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {imageIconSizes} from '@/styles/image';
import {CookingRecipeLayoutProps} from '@/ui/cooking/type';


type Props = Omit<CookingRecipeLayoutProps, 'clickable'> & {
  mealName: string
};

export const CookingRecipeContent = ({mealId, mealName, imageDimension}: Props) => {
  return (
    <Flex direction="col" className="items-end">
      <div className={clsx('relative', imageDimension)}>
        <NextImage
          src={`/images/meal/portrait/${mealId}.png`} alt={mealName} className="opacity-40" sizes={imageIconSizes}
        />
      </div>
    </Flex>
  );
};
