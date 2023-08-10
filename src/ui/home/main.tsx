import React from 'react';

import {Announcements} from '@/components/announcement/main';
import {I18nProvider} from '@/contexts/i18n';
import {getUserCount} from '@/controller/auth';
import {PageLayout} from '@/ui/base/layout';
import {HomeClient} from '@/ui/home/client';


export const Home = () => {
  const userCount = React.use(getUserCount());

  return (
    <PageLayout announcement={false}>
      <div className="md:px-10">
        <Announcements larger/>
      </div>
      <I18nProvider namespaces={['UI.Metadata', 'UI.InPage.Home']}>
        <HomeClient userCount={userCount}/>
      </I18nProvider>
    </PageLayout>
  );
};
