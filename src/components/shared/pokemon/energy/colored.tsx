import React from 'react';

import {NextImage} from '@/components/shared/common/image/main';
import {imageSmallIconSizes} from '@/styles/image';
import {Dimension} from '@/types/style';
import {classNames} from '@/utils/react';


type Props = {
  alt: string,
  dimension?: Dimension,
};

export const ColoredEnergyIcon = ({dimension, alt}: Props) => {
  return (
    <div className={classNames('relative', dimension ?? 'h-5 w-5')}>
      <NextImage src="/images/generic/energy.png" alt={alt} sizes={imageSmallIconSizes}/>
    </div>
  );
};
