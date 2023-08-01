import React from 'react';

import {NextImage} from '@/components/shared/common/image/main';


type Props = {
  src: string,
  alt: string,
  invert?: boolean,
};

export const PokemonDataIcon = ({src, alt, invert}: Props) => {
  return (
    <div className="relative h-6 w-6">
      <NextImage
        src={src} alt={alt} sizes="5vw"
        className={invert ? 'invert-on-light' : undefined}
      />
    </div>
  );
};
