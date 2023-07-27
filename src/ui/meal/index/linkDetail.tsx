import React from 'react';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {imageIconSizes} from '@/styles/image';
import {MealLinkProps} from '@/ui/meal/index/type';


export const MealLinkDetail = ({ingredients}: MealLinkProps) => {
  const t = useTranslations('Game.Food');

  return (
    <Flex direction="row" className="gap-0.5 text-xs">
      {ingredients.map(({id, quantity}) => (
        <>
          <div className="relative h-4 w-4">
            <Image src={`/images/ingredient/${id}.png`} alt={t(id.toString())} fill sizes={imageIconSizes}/>
          </div>
          <div className="shadow-slate-200 text-shadow dark:shadow-slate-900">
            {quantity}
          </div>
        </>
      ))}
    </Flex>
  );
};
