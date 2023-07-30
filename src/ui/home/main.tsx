import React from 'react';

import {I18nProvider} from '@/contexts/i18n';
import {PageLayout} from '@/ui/base/layout';
import {HomeClient} from '@/ui/home/client';


export const Home = () => {
  return (
    <PageLayout>
      <I18nProvider namespaces={['UI.Metadata', 'UI.InPage.Home']}>
        <HomeClient/>
      </I18nProvider>
    </PageLayout>
  );
};
