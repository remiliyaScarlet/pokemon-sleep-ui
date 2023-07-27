import React from 'react';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

import {textShadow} from '@/styles/classes';
import {imageIconSizes} from '@/styles/image';
import {Meal} from '@/types/mongo/meal';
import {classNames} from '@/utils/react';


type Props = {
  meal: Meal,
};

export const IngredientIcons = ({meal}: Props) => {
  const t = useTranslations('Game.Food');

  return (
    <>
      {meal.ingredients.map(({id, quantity}) => (
        <>
          <div className="relative h-4 w-4">
            <Image src={`/images/ingredient/${id}.png`} alt={t(id.toString())} fill sizes={imageIconSizes}/>
          </div>
          <div className={classNames('text-xs', textShadow)}>
            {quantity}
          </div>
        </>
      ))}
    </>
  );
};
