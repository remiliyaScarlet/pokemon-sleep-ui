import React from 'react';

import {Announcements} from '@/components/announcement/main';
import {I18nProvider} from '@/contexts/i18n';
import {getUserCount} from '@/controller/auth';
import {DefaultPageProps} from '@/types/next/page';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {HomeClient} from '@/ui/home/client';


export const Home = ({params}: DefaultPageProps) => {
  const {locale} = params;
  const userCount = React.use(getUserCount());

  return (
    <PublicPageLayout locale={locale} announcement={false}>
      <div className="md:px-10">
        <Announcements larger/>
      </div>
      <I18nProvider locale={locale} namespaces={['UI.Metadata', 'UI.InPage.Home']}>
        <HomeClient userCount={userCount}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
