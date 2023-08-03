import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {NextImage} from '@/components/shared/common/image/main';
import {imageSmallIconSizes} from '@/styles/image';
import {Dimension} from '@/types/style';
import {classNames} from '@/utils/react';


type Props = {
  id: number | null,
  dimension?: Dimension,
};

export const PokemonIngredientIcon = ({id, dimension}: Props) => {
  const t = useTranslations('Game.Food');

  if (id === null) {
    return (
      <div className={dimension ?? 'h-5 w-5'}>
        <XCircleIcon/>
      </div>
    );
  }

  return (
    <Link href={`/ingredient/${id}`} className="button-clickable">
      <div className={classNames('relative', dimension ?? 'h-5 w-5')}>
        <NextImage src={`/images/ingredient/${id}.png`} alt={t(id.toString())} sizes={imageSmallIconSizes}/>
      </div>
    </Link>
  );
};
