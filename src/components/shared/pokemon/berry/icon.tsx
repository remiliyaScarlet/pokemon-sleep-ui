import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {NextImage} from '@/components/shared/common/image/main';
import {imageSmallIconSizes} from '@/styles/image';
import {Dimension} from '@/types/style';


type Props = {
  id: number,
  dimension?: Dimension,
};

export const PokemonBerryIcon = ({id, dimension}: Props) => {
  const t = useTranslations('Game.Berry');

  return (
    <Link href={`/berry/${id}`}>
      <div className={clsx('button-clickable relative', dimension ?? 'h-5 w-5')}>
        <NextImage src={`/images/berry/${id}.png`} alt={t(id.toString())} sizes={imageSmallIconSizes}/>
      </div>
    </Link>
  );
};
