import React from 'react';

import {getServerSession} from 'next-auth';

import {authOptions} from '@/const/auth';
import {PageLayout} from '@/ui/base/layout/common';
import {PremiumOnlyPageAlert} from '@/ui/base/layout/premiumOnly/alert';
import {UiPageProps} from '@/ui/base/layout/type';


export const PremiumOnlyPageLayout = ({children, ...props}: React.PropsWithChildren<UiPageProps>) => {
  const session = React.use(getServerSession(authOptions));

  return (
    <PageLayout {...props}>
      {!session?.user.activation?.premium ? <PremiumOnlyPageAlert/> : children}
    </PageLayout>
  );
};
