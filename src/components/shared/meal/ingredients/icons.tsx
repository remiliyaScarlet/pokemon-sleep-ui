import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {dangerText} from '@/styles/classes';
import {imageIconSizes} from '@/styles/image';
import {Meal, MealIngredient} from '@/types/mongo/meal';


type Props = {
  meal: Meal,
  useTextShadow?: boolean,
  markRed?: (ingredient: MealIngredient) => boolean,
};

export const IngredientIcons = ({meal, useTextShadow = true, markRed}: Props) => {
  const t = useTranslations('Game.Food');

  return (
    <>
      {meal.ingredients.map((ingredient) => {
        const {id, quantity} = ingredient;

        return (
          <Flex key={id} direction="row" noFullWidth wrap className="gap-0.5">
            <div className="relative h-4 w-4">
              <NextImage src={`/images/ingredient/${id}.png`} alt={t(id.toString())} sizes={imageIconSizes}/>
            </div>
            <div className={clsx(
              'text-xs',
              useTextShadow && 'text-shadow-preset',
              markRed && markRed(ingredient) && dangerText,
            )}>
              {quantity}
            </div>
          </Flex>
        );
      })}
    </>
  );
};
