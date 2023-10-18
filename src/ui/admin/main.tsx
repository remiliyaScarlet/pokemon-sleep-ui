import React from 'react';

import {DefaultPageProps} from '@/types/next/page';
import {SiteAdminClient} from '@/ui/admin/client';
import {AdminOnlyPageLayout} from '@/ui/base/layout/adminOnly';


export const SiteAdmin = async ({params}: DefaultPageProps) => {
  const {locale} = params;

  return (
    <AdminOnlyPageLayout locale={locale}>
      <SiteAdminClient/>
    </AdminOnlyPageLayout>
  );
};
