import React from 'react';

import {getAllActivationsAsClient} from '@/controller/user/activation/data';
import {getUserIdEmailMap} from '@/controller/user/auth/main';
import {DefaultPageProps} from '@/types/next/page';
import {SiteAdminClient} from '@/ui/admin/client';
import {SiteAdminServerDataProps} from '@/ui/admin/type';
import {AdminOnlyPageLayout} from '@/ui/base/layout/adminOnly';


const SiteAdmin = async () => {
  const activations = await getAllActivationsAsClient();
  const userIdEmailMap = await getUserIdEmailMap(activations.map(({userId}) => userId));

  const props: SiteAdminServerDataProps = {
    userIdEmailMap,
    preloaded: {
      activations,
    },
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
