import React from 'react';

import {getServerSession} from 'next-auth';

import {SignIn} from '@/components/auth/signIn';
import {authOptions} from '@/const/auth';
import {PageLayout} from '@/ui/base/layout/common';
import {UiPageProps} from '@/ui/base/layout/type';


export const LoginRequiredPageLayout = ({children, ...props}: React.PropsWithChildren<UiPageProps>) => {
  const session = React.use(getServerSession(authOptions));

  return (
    <PageLayout {...props}>
      {session ? children : <SignIn/>}
    </PageLayout>
  );
};
