import React from 'react';

import {DocsAutoLinkClient} from '@/components/shared/docs/autoLink/client';
import {I18nProvider} from '@/contexts/i18n';
import {Locale} from '@/types/next/locale';


type Props = {
  locale: Locale,
};

export const DocsAutoLink = ({locale}: Props) => {
  return (
    <I18nProvider locale={locale} namespaces={[]}>
      <DocsAutoLinkClient locale={locale}/>
    </I18nProvider>
  );
};
