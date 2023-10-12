import React from 'react';

import {clsx} from 'clsx';
import Image, {ImageProps} from 'next/image';


export type NextImageProps = Omit<ImageProps, 'fill' | 'title'>;

const NextImageInternal = ({
  src,
  alt,
  sizes,
  className,
}: React.PropsWithChildren<NextImageProps>, ref: React.ForwardedRef<HTMLImageElement>) => (
  <Image ref={ref} src={src} alt={alt} fill title={alt} sizes={sizes} className={clsx('object-cover', className)}/>
);

export const NextImage = React.forwardRef(NextImageInternal);
