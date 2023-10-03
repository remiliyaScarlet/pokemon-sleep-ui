'use client';
import React from 'react';

import {Adsense} from '@ctrl/react-adsense';
import {useTheme} from 'next-themes';

import {adsClientId} from '@/components/ads/const';
import {AdsTemplateUnitProps} from '@/components/ads/unit/types';
import {getAdSenseValue} from '@/components/ads/unit/utils';
import {AdsWrapper} from '@/components/ads/wrapper';


type Props = AdsTemplateUnitProps;

export const AdsUnitDisplay = ({slot, ...props}: Props) => {
  const {theme} = useTheme();

  return (
    <AdsWrapper {...props}>
      <Adsense
        client={adsClientId}
        slot={getAdSenseValue({value: slot, theme})}
        className="block"
        format="horizontal"
        responsive="true"
      />
    </AdsWrapper>
  );
};
