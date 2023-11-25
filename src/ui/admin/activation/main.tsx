import React from 'react';

import {getAllActivationDataAsClient} from '@/controller/user/activation/data';
import {getAllActivationKeyAsClient} from '@/controller/user/activation/key';
import {getUserIdEmailMap} from '@/controller/user/auth/main';
import {DefaultPageProps} from '@/types/next/page/common';
import {AdminActivationManagementClient} from '@/ui/admin/activation/client';
import {AdminActivationServerDataProps} from '@/ui/admin/activation/type';
import {AdminOnlyPageLayout} from '@/ui/base/layout/adminOnly';


const AdminActivationManagementInternal = async () => {
  const [key, data] = await Promise.all([
    getAllActivationKeyAsClient(),
    getAllActivationDataAsClient(),
  ]);
  const userIdEmailMap = await getUserIdEmailMap(data.map(({userId}) => userId));

  const props: AdminActivationServerDataProps = {
    userIdEmailMap,
    preloaded: {key, data},
  };

  return <AdminActivationManagementClient {...props}/>;
};

export const AdminActivationManagement = async ({params}: DefaultPageProps) => {
  const {locale} = params;

  return (
    <AdminOnlyPageLayout locale={locale}>
      <AdminActivationManagementInternal/>
    </AdminOnlyPageLayout>
  );
};
