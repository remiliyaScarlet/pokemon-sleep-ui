import React from 'react';

import {getServerSession} from 'next-auth';

import {authOptions} from '@/const/auth';
import {I18nProvider} from '@/contexts/i18n';
import {UserControlClient} from '@/ui/base/navbar/user/client';


export const UserControl = () => {
  const session = React.use(getServerSession(authOptions));

  return (
    <I18nProvider namespaces={['UI.UserControl']}>
      <UserControlClient session={session}/>
    </I18nProvider>
  );
};
