import React from 'react';

import {AdsUnitProps} from '@/components/ads/type';
import {AdsUnitDisplay} from '@/components/ads/unit/display';
import {I18nAutoWrap} from '@/components/i18n/autoWrap';


export const AdsConfiguredDisplay = (props: AdsUnitProps) => (
  <I18nAutoWrap>
    <AdsUnitDisplay
      slot={{
        light: '2558560869',
        dark: '2558560869',
      }}
      {...props}
    />
  </I18nAutoWrap>
);
