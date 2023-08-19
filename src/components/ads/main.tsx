import React from 'react';

import {AdsConfiguredMultiplex} from '@/components/ads/configured/multiplex';
import {AdsUnitProps} from '@/components/ads/type';
import {AuthProvider} from '@/contexts/auth';


export const AdsUnit = (props: AdsUnitProps) => (
  <AuthProvider>
    <AdsConfiguredMultiplex {...props}/>
  </AuthProvider>
);
