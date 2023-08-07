import React from 'react';

import Image, {ImageProps} from 'next/image';

import {imageCDN} from '@/const/website';
import {isProduction} from '@/utils/environment';
import {classNames} from '@/utils/react';


export type NextImageProps = Omit<ImageProps, 'fill' | 'title'>;

export const NextImage = ({src, alt, sizes, className}: NextImageProps) => {
  const actualSrc = isProduction() ? `${imageCDN}${src}` : src;

  // Can't use `next.js` image optimization (therefore `unoptimized`)
  // because it causes too much workload for the reverse proxy
  return (
    <Image
      src={actualSrc} alt={alt} fill title={alt} sizes={sizes}
      className={classNames(className, 'object-cover')} unoptimized
    />
  );
};
