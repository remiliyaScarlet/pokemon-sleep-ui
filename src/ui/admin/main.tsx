import React from 'react';

import {getAllActivationsAsClient} from '@/controller/user/account/activation';
import {getUserIdEmailMap} from '@/controller/user/auth/main';
import {DefaultPageProps} from '@/types/next/page';
import {SiteAdminClient} from '@/ui/admin/client';
import {SiteAdminDataProps} from '@/ui/admin/type';
import {AdminOnlyPageLayout} from '@/ui/base/layout/adminOnly';


const SiteAdmin = async () => {
  const activations = await getAllActivationsAsClient();
  const userIdEmailMap = await getUserIdEmailMap(activations.map(({userId}) => userId));

  const props: SiteAdminDataProps = {
    activations,
    userIdEmailMap,
  };

  return <SiteAdminClient {...props}/>;
};


export const SiteAdminEntry = async ({params}: DefaultPageProps) => {
  const {locale} = params;

  return (
    <AdminOnlyPageLayout locale={locale}>
      <SiteAdmin/>
    </AdminOnlyPageLayout>
  );
};
