import React from 'react';

import {getAllActivationDataAsClient} from '@/controller/user/activation/data';
import {getUserIdEmailMap} from '@/controller/user/auth/main';
import {DefaultPageProps} from '@/types/next/page/common';
import {AdminActivationManagementClient} from '@/ui/admin/activation/client';
import {AdminActivationServerDataProps} from '@/ui/admin/activation/type';
import {AdminOnlyPageLayout} from '@/ui/base/layout/adminOnly';


const AdminActivationManagementInternal = async () => {
  const activations = await getAllActivationDataAsClient();
  const userIdEmailMap = await getUserIdEmailMap(activations.map(({userId}) => userId));

  const props: AdminActivationServerDataProps = {
    userIdEmailMap,
    preloaded: {
      activations,
    },
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
