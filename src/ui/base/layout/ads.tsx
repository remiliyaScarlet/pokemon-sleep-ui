import React from 'react';

import {AnchorAdsUnit} from '@/components/ads/anchor';
import {AdsPopup} from '@/components/ads/popup/main';
import {getLocale} from '@/components/i18n/exports';
import {I18nProvider} from '@/components/i18n/provider';


type Props = {
  adsShouldShow: boolean,
};

export const AdsLayout = ({adsShouldShow}: Props) => {
  if (!adsShouldShow) {
    return null;
  }

  const locale = getLocale();

  return (
    <I18nProvider locale={locale} namespaces={[]}>
      <AnchorAdsUnit/>
      <AdsPopup/>
    </I18nProvider>
  );
};
