import React from 'react';

import {NextImage} from '@/components/shared/common/image/main';
import {IconProps} from '@/components/shared/icon/type';
import {imageSmallIconSizes} from '@/styles/image';
import {classNames} from '@/utils/react';


export const ColoredEnergyIcon = ({dimension, alt, noWrap}: IconProps) => {
  if (noWrap) {
    return <NextImage src="/images/generic/energy.png" alt={alt} sizes={imageSmallIconSizes}/>;
  }

  return (
    <div className={classNames('relative', dimension ?? 'h-5 w-5')}>
      <NextImage src="/images/generic/energy.png" alt={alt} sizes={imageSmallIconSizes}/>
    </div>
  );
};
