import React from 'react';

import {NextImage} from '@/components/shared/common/image/main';
import {imageSmallIconSizes} from '@/styles/image';


type Props = {
  src: string,
  alt: string,
  invert?: boolean,
};

export const PokemonDataIcon = ({src, alt, invert}: Props) => {
  return (
    <div className="relative h-6 w-6">
      <NextImage
        src={src} alt={alt} sizes={imageSmallIconSizes}
        className={invert ? 'invert-hoverable' : undefined}
      />
    </div>
  );
};
