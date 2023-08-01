import React from 'react';

import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {imageSmallIconSizes} from '@/styles/image';
import {classNames} from '@/utils/react';


type Props = {
  id: number | null,
  dimension?: `h-${number} w-${number}`,
};

export const PokemonIngredientIcon = ({id, dimension}: Props) => {
  const t = useTranslations('Game.Food');

  if (id === null) {
    return (
      <div className={dimension ?? 'h-5 w-5'}>
        <XMarkIcon/>
      </div>
    );
  }

  return (
    <Link href={`/ingredient/${id}`} className="button-clickable">
      <div className={classNames('relative', dimension ?? 'h-5 w-5')}>
        <Image src={`/images/ingredient/${id}.png`} alt={t(id.toString())} fill sizes={imageSmallIconSizes}/>
      </div>
    </Link>
  );
};
