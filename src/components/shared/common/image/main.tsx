import React from 'react';

import {clsx} from 'clsx';
import Image, {ImageProps} from 'next/image';


export type NextImageProps = Omit<ImageProps, 'fill' | 'title'>;

export const NextImage = React.forwardRef<HTMLImageElement, React.PropsWithChildren<NextImageProps>>(({
  src,
  alt,
  sizes,
  className,
}, ref) => (
  <Image ref={ref} src={src} alt={alt} fill title={alt} sizes={sizes} className={clsx('object-cover', className)}/>
));
NextImage.displayName = 'NextImage';
