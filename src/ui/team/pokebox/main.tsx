import React from 'react';

import {I18nProvider} from '@/contexts/i18n';
import {PageLayout} from '@/ui/base/layout';


export const Pokebox = () => {
  return (
    <PageLayout>
      <I18nProvider namespaces={['Game']}>
      </I18nProvider>
    </PageLayout>
  );
};
