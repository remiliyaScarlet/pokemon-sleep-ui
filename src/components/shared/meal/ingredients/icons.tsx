import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {IngredientIconsCommonProps} from '@/components/shared/meal/ingredients/type';
import {dangerText} from '@/styles/classes';
import {imageIconSizes} from '@/styles/image';
import {IngredientId} from '@/types/game/ingredient';
import {PokemonProducingItem} from '@/types/game/pokemon/producing';


type Props = IngredientIconsCommonProps & {
  ingredients: PokemonProducingItem<IngredientId>[],
};

export const IngredientIcons = ({ingredients, useTextShadow = true, markRed}: Props) => {
  const t = useTranslations('Game.Food');

  return (
    <Flex direction="row" noFullWidth className="items-end gap-0.5 text-xs">
      {ingredients.map((ingredient) => {
        const {id, qty} = ingredient;

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
              {qty}
            </div>
          </Flex>
        );
      })}
    </Flex>
  );
};
