import React from 'react';

import Image from 'next/image';

import {invertStyle} from '@/styles/classes';


type Props = {
  src: string,
  alt: string,
  invert?: boolean,
};

export const PokemonDataIcon = ({src, alt, invert}: Props) => {
  return (
    <div className="relative h-6 w-6">
      <Image
        src={src} alt={alt} fill sizes="5vw"
        className={invert ? invertStyle.normal : undefined}
      />
    </div>
  );
};
