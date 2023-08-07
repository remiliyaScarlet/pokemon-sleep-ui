import React from 'react';

import {NextImage} from '@/components/shared/common/image/main';
import {IconProps} from '@/components/shared/icon/type';
import {imageSmallIconSizes} from '@/styles/image';
import {classNames} from '@/utils/react';


type Props = IconProps & {
  src: string,
};

export const GenericIconBase = ({dimension, alt, noWrap, src}: Props) => {
  if (noWrap) {
    return (
      <NextImage src={src} alt={alt} sizes={imageSmallIconSizes} className="invert-on-light"/>
    );
  }

  return (
    <div className={classNames('relative', dimension ?? 'h-5 w-5')}>
      <NextImage src={src} alt={alt} sizes={imageSmallIconSizes} className="invert-on-light"/>
    </div>
  );
};
