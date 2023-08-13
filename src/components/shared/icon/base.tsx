import React from 'react';

import {clsx} from 'clsx';

import {NextImage} from '@/components/shared/common/image/main';
import {IconProps} from '@/components/shared/icon/type';
import {imageSmallIconSizes} from '@/styles/image';


type Props = IconProps & {
  src: string,
  noInvert?: boolean,
};

export const GenericIconBase = ({alt, className, dimension, noWrap, src, noInvert}: Props) => {
  const imageClassName = className ?? (noInvert ? '' : 'invert-hoverable');

  if (noWrap) {
    return (
      <NextImage src={src} alt={alt} sizes={imageSmallIconSizes} className={imageClassName}/>
    );
  }

  return (
    <div className={clsx('relative', dimension ?? 'h-5 w-5')}>
      <NextImage src={src} alt={alt} sizes={imageSmallIconSizes} className={imageClassName}/>
    </div>
  );
};
