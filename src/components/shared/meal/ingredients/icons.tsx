import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {IngredientIconsCommonProps} from '@/components/shared/meal/ingredients/type';
import {imageIconSizes} from '@/styles/image';
import {IngredientId} from '@/types/game/ingredient';
import {PokemonProducingItem} from '@/types/game/pokemon/producing';
import {Dimension} from '@/types/style';


type Props = IngredientIconsCommonProps & {
  ingredients: PokemonProducingItem<IngredientId>[],
  dimension?: Dimension,
  textSizeClassName?: string,
  className?: string,
};

export const IngredientIcons = ({
  markRed,
  ingredients,
  dimension,
  textSizeClassName,
  useTextShadow = true,
  className,
}: Props) => {
  const t = useTranslations('Game.Food');

  return (
    <Flex direction="row" noFullWidth className={clsx(
      'items-end gap-0.5',
      textSizeClassName ?? 'text-xs',
      className,
    )}>
      {ingredients.map((ingredient) => {
        const {id, qty} = ingredient;

        return (
          <Flex key={id} direction="row" noFullWidth wrap className="items-center gap-0.5">
            <div className={clsx('relative', dimension ?? 'h-4 w-4')}>
              <NextImage src={`/images/ingredient/${id}.png`} alt={t(id.toString())} sizes={imageIconSizes}/>
            </div>
            <div className={clsx(
              useTextShadow && 'text-shadow-preset',
              markRed && markRed(ingredient) && 'text-danger',
              markGreen && markGreen(ingredient) && 'text-safe',
            )}>
              {qty}
            </div>
          </Flex>
        );
      })}
    </Flex>
  );
};
