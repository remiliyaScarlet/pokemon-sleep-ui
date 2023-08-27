import React from 'react';

import {clsx} from 'clsx';

import {NextImage} from '@/components/shared/common/image/main';
import {imageSmallIconSizes} from '@/styles/image';
import {Dimension} from '@/types/style';


type Props = {
  src: string,
  alt: string,
  invert?: boolean,
  dimension?: Dimension,
};

export const PokemonDataIcon = ({src, alt, invert, dimension}: Props) => {
  return (
    <div className={clsx('relative', dimension ?? 'h-6 w-6')}>
      <NextImage
        src={src} alt={alt} sizes={imageSmallIconSizes}
        className={clsx(invert && 'invert-hoverable')}
      />
    </div>
  );
};
