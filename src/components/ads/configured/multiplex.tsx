import React from 'react';

import {AdsUnitProps} from '@/components/ads/type';
import {AdsUnitMultiplex} from '@/components/ads/unit/multiplex';


export const AdsConfiguredMultiplex = ({className}: AdsUnitProps) => (
  <AdsUnitMultiplex
    className={className}
    slot={{
      light: '1981146258',
      dark: '8134710811',
    }}
  />
);
