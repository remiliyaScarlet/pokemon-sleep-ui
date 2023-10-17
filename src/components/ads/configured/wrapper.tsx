import React from 'react';

import {I18nProvider} from '@/contexts/i18n';
import {getLocale} from '@/ui/base/context';
import {isServerSide} from '@/utils/react';


export const AdsConfiguredWrapper = ({children}: React.PropsWithChildren<{}>) => {
  if (isServerSide()) {
    const locale = getLocale();

    return (
      <I18nProvider locale={locale} namespaces={[]}>
        {children}
      </I18nProvider>
    );
  }

  return children;
};
