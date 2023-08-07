import React from 'react';

import {NextImage} from '@/components/shared/common/image/main';
import {IconProps} from '@/components/shared/icon/type';
import {imageSmallIconSizes} from '@/styles/image';
import {classNames} from '@/utils/react';


type Props = IconProps & {
  src: string,
};

export const GenericIconBase = ({alt, className, dimension, noWrap, src}: Props) => {
  if (noWrap) {
    return (
      <NextImage src={src} alt={alt} sizes={imageSmallIconSizes} className={className ?? 'invert-hoverable'}/>
    );
  }

  return (
    <div className={classNames('relative', dimension ?? 'h-5 w-5')}>
      <NextImage src={src} alt={alt} sizes={imageSmallIconSizes} className={className ?? 'invert-hoverable'}/>
    </div>
  );
};
