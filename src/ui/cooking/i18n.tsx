import React from 'react';

import {pick} from 'lodash';
import {NextIntlClientProvider, useLocale, useMessages} from 'next-intl';

import {I18nNamespaces} from '@/types/i18n';


type Props = {
  namespaces: I18nNamespaces[],
};

export const I18nProvider = ({children, namespaces}: React.PropsWithChildren<Props>) => {
  const locale = useLocale();
  const messages = useMessages();

  if (!messages) {
    return <></>;
  }

  return (
    <NextIntlClientProvider locale={locale} messages={pick(messages, ...namespaces)}>
      {children}
    </NextIntlClientProvider>
  );
};
