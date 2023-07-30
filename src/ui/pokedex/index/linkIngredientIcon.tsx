import React from 'react';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

import {imageIconSizes} from '@/styles/image';


type Props = {
  id: number | null,
};

export const PokedexIngredientIcon = ({id}: Props) => {
  const t = useTranslations('Game.Food');

  if (id === null) {
    return <></>;
  }

  return (
    <div key={id} className="relative h-5 w-5">
      <Image src={`/images/ingredient/${id}.png`} alt={t(id.toString())} fill sizes={imageIconSizes}/>
    </div>
  );
};
