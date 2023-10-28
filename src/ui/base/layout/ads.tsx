import React from 'react';

import {AnchorAdsUnit} from '@/components/ads/anchor';
import {AdsPopup} from '@/components/ads/popup/main';
import {I18nProvider} from '@/contexts/i18n';
import {getLocale} from '@/ui/base/context';


type Props = {
  adsShouldShow: boolean,
};

export const AdsOfLayout = ({adsShouldShow}: Props) => {
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
