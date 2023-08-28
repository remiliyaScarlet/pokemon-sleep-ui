import React from 'react';

import {getServerSession} from 'next-auth';

import {authOptions} from '@/const/auth';
import {I18nProvider} from '@/contexts/i18n';
import {Locale} from '@/types/next/locale';
import {UserControlClient} from '@/ui/base/navbar/user/client';


type Props = {
  locale: Locale,
};

export const UserControl = ({locale}: Props) => {
  const session = React.use(getServerSession(authOptions));

  return (
    <I18nProvider locale={locale} namespaces={['UI.UserControl']}>
      <UserControlClient session={session}/>
    </I18nProvider>
  );
};
