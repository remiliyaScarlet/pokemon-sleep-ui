import React from 'react';

import {redirect} from 'next/navigation';

import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {SandboxClient} from '@/ui/sandbox/client';
import {isProduction} from '@/utils/environment';


export const Sandbox = async ({params}: DefaultPageProps) => {
  const {locale} = params;

  if (isProduction()) {
    redirect('/');
  }

  return (
    <PublicPageLayout locale={locale}>
      <SandboxClient/>
    </PublicPageLayout>
  );
};
