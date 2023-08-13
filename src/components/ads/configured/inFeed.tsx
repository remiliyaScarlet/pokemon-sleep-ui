import React from 'react';

import {AdsUnitProps} from '@/components/ads/type';
import {AdsUnitInFeed} from '@/components/ads/unit/inFeed';


export const AdsConfiguredInFeed = ({className}: AdsUnitProps) => (
  <AdsUnitInFeed
    className={className}
    slot={{
      light: '8843083404',
      dark: '4610009138',
    }}
    layoutKey={{
      light: '-fb+5w+4e-db+86',
      dark: '-fb+5w+4e-db+86',
    }}
  />
);
