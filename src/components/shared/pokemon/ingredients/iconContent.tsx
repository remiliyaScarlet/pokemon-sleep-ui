import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {NextImage} from '@/components/shared/common/image/main';
import {IngredientIconCommonProps} from '@/components/shared/pokemon/ingredients/type';
import {imageSmallIconSizes} from '@/styles/image';


type Props = IngredientIconCommonProps & {
  id: number,
};

export const PokemonIngredientIconContent = ({dimension, id}: Props) => {
  const t = useTranslations('Game.Food');

  return (
    <div className={clsx('button-clickable relative', dimension ?? 'h-5 w-5')}>
      <NextImage src={`/images/ingredient/${id}.png`} alt={t(id.toString())} sizes={imageSmallIconSizes}/>
    </div>
  );
};
