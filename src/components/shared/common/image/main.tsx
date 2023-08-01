import React from 'react';

import Image, {ImageProps} from 'next/image';


type Props = Omit<ImageProps, 'fill' | 'title'>;

export const NextImage = ({src, alt, sizes, className}: Props) => {
  return (
    <Image src={src} alt={alt} fill title={alt} sizes={sizes} className={className}/>
  );
};
