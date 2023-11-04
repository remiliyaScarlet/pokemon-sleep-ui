import React from 'react';

import {notFound} from 'next/navigation';
import {getServerSession} from 'next-auth';

import {DocsControl} from '@/components/shared/docs/control/main';
import {DocsMeta} from '@/components/shared/docs/meta/main';
import {DocsContentView} from '@/components/shared/docs/view/main';
import {authOptions} from '@/const/auth';
import {getDocBySlug} from '@/controller/docs';
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
      <DocsMeta doc={doc}/>
      <DocsControl session={session} path={doc.path}/>
      <DocsContentView locale={locale} doc={doc}/>
    </PublicPageLayout>
  );
};
