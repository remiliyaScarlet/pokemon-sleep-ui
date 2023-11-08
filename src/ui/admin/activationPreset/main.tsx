import React from 'react';

import {getActivationPresetMap} from '@/controller/user/activation/preset';
import {DefaultPageProps} from '@/types/next/page/common';
import {AdminActivationPresetClient} from '@/ui/admin/activationPreset/client';
import {AdminActivationPresetServerDataProps} from '@/ui/admin/activationPreset/type';
import {AdminOnlyPageLayout} from '@/ui/base/layout/adminOnly';


const AdminActivationPresetInternal = async () => {
  const props: AdminActivationPresetServerDataProps = {
    preloaded: await getActivationPresetMap(),
  };

  return <AdminActivationPresetClient {...props}/>;
};

export const AdminActivationPreset = async ({params}: DefaultPageProps) => {
  const {locale} = params;

  return (
    <AdminOnlyPageLayout locale={locale}>
      <AdminActivationPresetInternal/>
    </AdminOnlyPageLayout>
  );
};
