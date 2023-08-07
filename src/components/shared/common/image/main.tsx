import React from 'react';

import Image, {ImageProps} from 'next/image';

import {imageCDN} from '@/const/website';
import {isProduction} from '@/utils/environment';


export type NextImageProps = Omit<ImageProps, 'fill' | 'title'>;

export const NextImage = ({src, alt, sizes, className}: NextImageProps) => {
  const actualSrc = isProduction() ? `${imageCDN}${src}` : src;

  if (isProduction()) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={`${imageCDN}${src}`} alt={alt} title={alt} sizes={sizes} className={className}/>
    );
  }

  return (
    <Image src={actualSrc} alt={alt} fill title={alt} sizes={sizes} className={className}/>
  );
};
