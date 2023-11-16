import React from 'react';

import {getLocale} from '@/components/i18n/exports';
import {I18nProvider} from '@/components/i18n/provider';
import {I18nNamespaces} from '@/types/i18n';
import {isServerSide} from '@/utils/react';


type Props = {
  namespaces?: I18nNamespaces[],
};

export const I18nAutoWrap = ({namespaces, children}: React.PropsWithChildren<Props>) => {
  if (isServerSide()) {
    const locale = getLocale();

    return (
      <I18nProvider locale={locale} namespaces={namespaces ?? []}>
        {children}
      </I18nProvider>
    );
  }

  return children;
};
