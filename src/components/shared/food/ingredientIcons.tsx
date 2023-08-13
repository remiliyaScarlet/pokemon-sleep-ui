import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {imageIconSizes} from '@/styles/image';
import {Meal} from '@/types/mongo/meal';


type Props = {
  meal: Meal,
  useTextShadow?: boolean,
};

export const IngredientIcons = ({meal, useTextShadow = true}: Props) => {
  const t = useTranslations('Game.Food');

  return (
    <>
      {meal.ingredients.map(({id, quantity}) => (
        <Link key={id} href={`/ingredient/${id}`}>
          <Flex direction="row" className="gap-0.5">
            <div className="relative h-4 w-4">
              <NextImage src={`/images/ingredient/${id}.png`} alt={t(id.toString())} sizes={imageIconSizes}/>
            </div>
            <div className={clsx('text-xs', useTextShadow && 'text-shadow-preset')}>
              {quantity}
            </div>
          </Flex>
        </Link>
      ))}
    </>
  );
};
