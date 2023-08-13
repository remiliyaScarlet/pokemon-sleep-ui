'use client';
import React from 'react';

import {Adsense} from '@ctrl/react-adsense';
import {clsx} from 'clsx';
import {useTheme} from 'next-themes';

import {adsClientId, adsHeight} from '@/components/ads/const';
import {AdSenseValue, AdsTemplateUnitProps} from '@/components/ads/unit/types';
import {getAdSenseValue} from '@/components/ads/unit/utils';
import {AdsWrapper} from '@/components/ads/wrapper';


type Props = AdsTemplateUnitProps & {
  layoutKey: AdSenseValue,
};

export const AdsUnitInFeed = ({slot, layoutKey, className}: Props) => {
  const {theme} = useTheme();

  return (
    <AdsWrapper className={className}>
      <Adsense
        client={adsClientId}
        slot={getAdSenseValue({value: slot, theme})}
        className={clsx('block', adsHeight)}
        layoutKey={getAdSenseValue({value: layoutKey, theme})}
        format="fluid"
      />
    </AdsWrapper>
  );
};
