import React from 'react';

import {Announcements} from '@/components/announcement/main';
import {I18nProvider} from '@/contexts/i18n';
import {PageLayout} from '@/ui/base/layout';
import {HomeClient} from '@/ui/home/client';


export const Home = () => {
  return (
    <PageLayout announcement={false}>
      <div className="md:px-10">
        <Announcements larger/>
      </div>
      <I18nProvider namespaces={['UI.Metadata', 'UI.InPage.Home']}>
        <HomeClient/>
      </I18nProvider>
    </PageLayout>
  );
};
