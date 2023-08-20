import React from 'react';

import {AdsConfiguredMultiplex} from '@/components/ads/configured/multiplex';
import {AdsUnitProps} from '@/components/ads/type';


export const AdsUnit = (props: AdsUnitProps) => (
  <AdsConfiguredMultiplex {...props}/>
);
