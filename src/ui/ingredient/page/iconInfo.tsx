import React from 'react';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {Dimension} from '@/types/style';
import {classNames} from '@/utils/react';


type Props = {
  imageSrc: string,
  imageAlt: string,
  imageDimension: Dimension,
  imageSizes: string,
  info?: React.ReactNode,
};

export const IconWithInfo = ({imageSrc, imageAlt, imageDimension, imageSizes, info}: Props) => {
  return (
    <div className={classNames('relative', imageDimension)}>
      {info &&
        <Flex
          direction="col" center noFullWidth
          className="info-in-image absolute bottom-0 right-0 z-10 h-5 w-5 text-xs"
        >
          {info}
        </Flex>}
      <NextImage src={imageSrc} alt={imageAlt} sizes={imageSizes}/>
    </div>
  );
};
