import React from 'react';

import {AdsConfiguredWrapper} from '@/components/ads/configured/wrapper';
import {AdsUnitProps} from '@/components/ads/type';
import {AdsUnitMultiplex} from '@/components/ads/unit/multiplex';


export const AdsConfiguredMultiplex = (props: AdsUnitProps) => (
  <AdsConfiguredWrapper>
    <AdsUnitMultiplex
      {...props}
      slot={{
        light: '1981146258',
        dark: '8134710811',
      }}
    />
  </AdsConfiguredWrapper>
);
