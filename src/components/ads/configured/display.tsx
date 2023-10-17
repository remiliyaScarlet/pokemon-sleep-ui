import React from 'react';

import {AdsConfiguredWrapper} from '@/components/ads/configured/wrapper';
import {AdsUnitProps} from '@/components/ads/type';
import {AdsUnitDisplay} from '@/components/ads/unit/display';


export const AdsConfiguredDisplay = (props: AdsUnitProps) => (
  <AdsConfiguredWrapper>
    <AdsUnitDisplay
      fullHeight
      slot={{
        light: '2558560869',
        dark: '2558560869',
      }}
      {...props}
    />
  </AdsConfiguredWrapper>
);
