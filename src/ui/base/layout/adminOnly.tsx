import React from 'react';

import {redirect} from 'next/navigation';
import {getServerSession} from 'next-auth';

import {authOptions} from '@/const/auth';
import {PageLayout} from '@/ui/base/layout/common';
import {UiPageProps} from '@/ui/base/layout/type';


export const AdminOnlyPageLayout = ({children, ...props}: React.PropsWithChildren<UiPageProps>) => {
  const session = React.use(getServerSession(authOptions));

  if (!session?.user.isAdmin) {
    redirect('/');
  }

  return (
    <PageLayout {...props}>
      {children}
    </PageLayout>
  );
};
