import React from 'react';

import {notFound} from 'next/navigation';
import {getServerSession} from 'next-auth';

import {AdsUnit} from '@/components/ads/main';
import {DocsControl} from '@/components/shared/docs/control/main';
import {DocsMeta} from '@/components/shared/docs/meta/main';
import {DocsContentView} from '@/components/shared/docs/view/main';
import {authOptions} from '@/const/auth';
import {getDocBySlug} from '@/controller/docs';
import {isCmsMod} from '@/controller/user/account/common';
import {PageProps} from '@/types/next/page/common';
import {DocsPageParams} from '@/types/next/page/docs';
import {PublicPageLayout} from '@/ui/base/layout/public';


export const DocsView = async ({params}: PageProps<DocsPageParams>) => {
  const {locale} = params;

  const [
    session,
    doc,
  ] = await Promise.all([
    getServerSession(authOptions),
    getDocBySlug({
      ...params,
      count: true,
    }),
  ]);

  if (!doc) {
    return notFound();
  }

  return (
    <PublicPageLayout locale={locale}>
      <AdsUnit/>
      <DocsMeta doc={doc}/>
      <DocsControl session={session} path={doc.path}/>
      <AdsUnit/>
      <DocsContentView locale={locale} doc={doc}/>
      <AdsUnit/>
    </PublicPageLayout>
  );
};
