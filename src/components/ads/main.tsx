import React from 'react';

import {AdsUnitProps} from '@/components/ads/type';
import {AdsUnitDisplay} from '@/components/ads/unit/display';
import {AdsUnitInArticle} from '@/components/ads/unit/inArticle';
import {AdsUnitInFeed} from '@/components/ads/unit/inFeed';
import {AdsUnitMultiplex} from '@/components/ads/unit/multiplex';


export const AdsArticle = () => (
  <AdsUnitInArticle
    slot={{
      light: '1322282773',
      dark: '1322282773',
    }}
  />
);

export const AdsInFeed = () => (
  <AdsUnitInFeed
    slot={{
      light: '3962363338',
      dark: '3962363338',
    }}
    layoutKey={{
      light: '-f7+5u+4t-da+6l',
      dark: '-f7+5u+4t-da+6l',
    }}
  />
);

export const AdsDisplay = () => (
  <AdsUnitDisplay
    slot={{
      light: '2966927859',
      dark: '2966927859',
    }}
  />
);

export const AdsUnit = ({className}: AdsUnitProps) => (
  <AdsUnitMultiplex
    className={className}
    slot={{
      light: '1981146258',
      dark: '8134710811',
    }}
  />
);
