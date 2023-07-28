import React from 'react';

import Image from 'next/image';

import {Flex} from '@/components/layout/flex';
import {classNames} from '@/utils/react';


type Props = {
  imageSrc: string,
  imageAlt: string,
  imageDimension: `h-${number} w-${number}`,
  imageSizes: string,
  info?: React.ReactNode,
};

export const IconWithInfo = ({imageSrc, imageAlt, imageDimension, imageSizes, info}: Props) => {
  return (
    <div className={classNames('relative', imageDimension)}>
      {
        info &&
        <Flex
          direction="col" center noFullWidth
          className="info-in-image absolute bottom-0 right-0 z-10 h-5 w-5 text-xs"
        >
          {info}
        </Flex>
      }
      <Image src={imageSrc} alt={imageAlt} fill sizes={imageSizes}/>
    </div>
  );
};
