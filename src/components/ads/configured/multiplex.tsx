import React from 'react';

import {AdsUnitProps} from '@/components/ads/type';
import {AdsUnitMultiplex} from '@/components/ads/unit/multiplex';
import {I18nAutoWrap} from '@/components/i18n/autoWrap';


export const AdsConfiguredMultiplex = (props: AdsUnitProps) => (
  <I18nAutoWrap>
    <AdsUnitMultiplex
      {...props}
      slot={{
        light: '1981146258',
        dark: '8134710811',
      }}
    />
  </I18nAutoWrap>
);
