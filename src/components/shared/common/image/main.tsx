import React from 'react';

import Image, {ImageProps} from 'next/image';

import {classNames} from '@/utils/react';


export type NextImageProps = Omit<ImageProps, 'fill' | 'title'>;

export const NextImage = ({src, alt, sizes, className}: NextImageProps) => {
  return (
    <Image
      src={src} alt={alt} fill title={alt} sizes={sizes}
      className={classNames(className, 'object-cover')} unoptimized
    />
  );
};
