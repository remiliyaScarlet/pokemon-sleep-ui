import React from 'react';

import {DefaultPageProps} from '@/types/next/page';
import {AuthLayout} from '@/ui/auth/common/layout';
import {AuthSignInEmailClient} from '@/ui/auth/signIn/email/client';


export const AuthSignInEmail = ({params}: DefaultPageProps) => {
  const {locale} = params;

  return (
    <AuthLayout locale={locale}>
      <AuthSignInEmailClient/>
    </AuthLayout>
  );
};
