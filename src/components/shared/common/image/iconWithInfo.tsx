import React from 'react';

import {clsx} from 'clsx';

import {InfoIcon} from '@/components/icons/info';
import {NextImage} from '@/components/shared/common/image/main';
import {Dimension} from '@/types/style';


type Props = {
  imageSrc: string,
  imageAlt: string,
  imageDimension: Dimension,
  imageSizes: string,
  info?: React.ReactNode,
};

export const IconWithInfo = ({imageSrc, imageAlt, imageDimension, imageSizes, info}: Props) => {
  return (
    <div className={clsx('relative', imageDimension)}>
      {info && <InfoIcon className="absolute bottom-0 right-0 z-10">{info}</InfoIcon>}
      <NextImage src={imageSrc} alt={imageAlt} sizes={imageSizes}/>
    </div>
  );
};
