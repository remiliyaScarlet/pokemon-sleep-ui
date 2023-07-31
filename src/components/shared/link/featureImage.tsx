import React from 'react';

import Image from 'next/image';

import {FeatureLink} from '@/components/shared/link/feature';
import {FeatureLinkImageProps} from '@/components/shared/link/type';
import {imageSmallIconSizes} from '@/styles/image';


type Props = FeatureLinkImageProps & {
  text: string,
};

export const FeatureLinkImage = ({imageSrc, ...props}: Props) => {
  const {disabled, text} = props;

  if (disabled) {
    return (
      <FeatureLink {...props}>
        <div className="relative h-12 w-12">
          <Image src={imageSrc} alt={text} fill className="invert-on-light" sizes={imageSmallIconSizes}/>
        </div>
      </FeatureLink>
    );
  }

  return (
    <FeatureLink {...props}>
      <div className="relative h-12 w-12">
        <Image src={imageSrc} alt={text} fill className="invert-icon" sizes={imageSmallIconSizes}/>
      </div>
    </FeatureLink>
  );
};
