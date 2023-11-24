import React from 'react';

import {AdsConfiguredInFeed} from '@/components/ads/configured/inFeed';
import {AdsUnitProps} from '@/components/ads/type';


export const AdsUnit = (props: AdsUnitProps) => (
  <AdsConfiguredInFeed {...props}/>
);
