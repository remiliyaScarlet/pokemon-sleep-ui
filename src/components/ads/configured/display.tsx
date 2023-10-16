import React from 'react';

import {AdsUnitProps} from '@/components/ads/type';
import {AdsUnitDisplay} from '@/components/ads/unit/display';


export const AdsConfiguredDisplay = (props: AdsUnitProps) => (
  <AdsUnitDisplay
    fullHeight
    slot={{
      light: '2558560869',
      dark: '2558560869',
    }}
    {...props}
  />
);
