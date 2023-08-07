import React from 'react';

import Image, {ImageProps} from 'next/image';

import {imageCDN} from '@/const/website';
import {isProduction} from '@/utils/environment';


export type NextImageProps = Omit<ImageProps, 'fill' | 'title'>;

export const NextImage = ({src, alt, sizes, className}: NextImageProps) => {
  const actualSrc = isProduction() ? `${imageCDN}${src}` : src;

  return (
    <Image src={actualSrc} alt={alt} fill title={alt} sizes={sizes} className={className}/>
  );
};
