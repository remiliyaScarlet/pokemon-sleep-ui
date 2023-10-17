'use client';
import React from 'react';

import {Adsense} from '@ctrl/react-adsense';
import {useTheme} from 'next-themes';

import {adsClientId} from '@/components/ads/const';
import {AdsTemplateUnitProps} from '@/components/ads/unit/types';
import {getAdSenseValue} from '@/components/ads/unit/utils';
import {AdsWrapper} from '@/components/ads/wrapper';


export const AdsUnitMultiplex = ({slot, ...props}: AdsTemplateUnitProps) => {
  const {theme} = useTheme();

  // About customization: https://support.google.com/adsense/answer/7533385?hl=en&ref_topic=9183242
  // This renders 1x4 in desktop, 2x2 in mobile
  return (
    <AdsWrapper {...props}>
      <Adsense
        client={adsClientId}
        slot={getAdSenseValue({value: slot, theme})}
        className="block"
        format="rectangle"
        data-matched-content-rows-num="1,1"
        data-matched-content-columns-num="3,4"
        data-matched-content-ui-type="image_stacked,image_card_sidebyside"
      />
    </AdsWrapper>
  );
};
