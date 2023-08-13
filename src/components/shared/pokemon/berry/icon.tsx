import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {NextImage} from '@/components/shared/common/image/main';
import {imageSmallIconSizes} from '@/styles/image';
import {Dimension} from '@/types/style';


type Props = {
  id: number | null,
  dimension?: Dimension,
};

export const PokemonBerryIcon = ({id, dimension}: Props) => {
  const t = useTranslations('Game.Berry');

  if (id === null) {
    return (
      <div className={dimension ?? 'h-5 w-5'}>
        <XCircleIcon/>
      </div>
    );
  }

  return (
    <Link href={`/berry/${id}`}>
      <div className={clsx('button-clickable relative', dimension ?? 'h-5 w-5')}>
        <NextImage src={`/images/berry/${id}.png`} alt={t(id.toString())} sizes={imageSmallIconSizes}/>
      </div>
    </Link>
  );
};
