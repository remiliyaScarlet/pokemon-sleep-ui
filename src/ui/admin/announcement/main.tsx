import React from 'react';

import {getAllAnnouncements} from '@/controller/announcement';
import {DefaultPageProps} from '@/types/next/page/common';
import {AdminAnnouncementClient} from '@/ui/admin/announcement/client';
import {AdminAnnouncementServerDataProps} from '@/ui/admin/announcement/type';
import {AdminOnlyPageLayout} from '@/ui/base/layout/adminOnly';


const AdminAnnouncementInternal = async () => {
  const props: AdminAnnouncementServerDataProps = {
    preloaded: await getAllAnnouncements(),
  };

  return <AdminAnnouncementClient {...props}/>;
};

export const AdminAnnouncement = async ({params}: DefaultPageProps) => {
  const {locale} = params;

  return (
    <AdminOnlyPageLayout locale={locale}>
      <AdminAnnouncementInternal/>
    </AdminOnlyPageLayout>
  );
};
