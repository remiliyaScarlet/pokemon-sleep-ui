'use client';
import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Collapsible} from '@/components/layout/collapsible/main';
import {isProduction} from '@/utils/environment';


export const AnchorAdsUnit = () => {
  const ads = useCollapsible(isProduction());

  return (
    <Collapsible state={ads} button="Ads" classNameForHeight="h-32">
      <AdsUnit/>
    </Collapsible>
  );
};
