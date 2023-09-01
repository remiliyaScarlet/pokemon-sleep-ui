import React from 'react';

import {Session} from 'next-auth';

import {I18nProvider} from '@/contexts/i18n';
import {Locale} from '@/types/next/locale';
import {UserAuthControlClient} from '@/ui/base/navbar/userAuth/client';


type Props = {
  locale: Locale,
  session: Session | null,
};

export const UserAuthControl = ({locale, session}: Props) => {
  return (
    <I18nProvider locale={locale} namespaces={['UI.UserControl']}>
      <UserAuthControlClient session={session}/>
    </I18nProvider>
  );
};
