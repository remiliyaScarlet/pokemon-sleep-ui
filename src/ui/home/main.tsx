import React from 'react';

import {Announcements} from '@/components/announcement/main';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {I18nProvider} from '@/contexts/i18n';
import {getUserCount} from '@/controller/auth';
import {getPaidUserCount} from '@/controller/user/account/activation';
import {DefaultPageProps} from '@/types/next/page';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {HomeClient} from '@/ui/home/client';


export const Home = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const [
    userCount,
    paidUserCount,
  ] = await Promise.all([
    getUserCount(),
    getPaidUserCount(),
  ]);


  return (
    <PublicPageLayout locale={locale} announcement={false}>
      <Announcements showOn="always" larger height="h-24"/>
      <HorizontalSplitter/>
      <I18nProvider locale={locale} namespaces={['UI.Metadata', 'UI.InPage.Home']}>
        <HomeClient userCount={userCount} paidUserCount={paidUserCount}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
