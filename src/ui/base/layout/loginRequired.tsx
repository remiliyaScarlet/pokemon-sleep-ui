import React from 'react';

import {getServerSession} from 'next-auth';

import {SignIn} from '@/components/auth/signIn';
import {authOptions} from '@/const/auth';
import {PageLayout} from '@/ui/base/layout/common';
import {PageProps} from '@/ui/base/layout/type';


export const LoginRequiredPageLayout = ({announcement, children}: React.PropsWithChildren<PageProps>) => {
  const session = React.use(getServerSession(authOptions));

  return (
    <PageLayout announcement={announcement}>
      {session ? children : <SignIn/>}
    </PageLayout>
  );
};
