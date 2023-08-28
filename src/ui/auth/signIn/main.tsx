import React from 'react';

import {redirect} from 'next/navigation';
import {getServerSession} from 'next-auth';

import {authOptions} from '@/const/auth';
import {DefaultPageProps} from '@/types/next/page';
import {AuthLayout} from '@/ui/auth/common/layout';
import {AuthSignInEmailForm} from '@/ui/auth/signIn/email';
import {AuthSignInExternal} from '@/ui/auth/signIn/external';


export const AuthSignIn = ({params, searchParams}: DefaultPageProps) => {
  const {locale} = params;
  const session = React.use(getServerSession(authOptions));

  if (session) {
    const callbackUrl = searchParams?.callbackUrl;

    if (typeof callbackUrl !== 'string') {
      redirect('/');
    }

    redirect(callbackUrl);
  }

  return (
    <AuthLayout locale={locale}>
      <AuthSignInEmailForm/>
      <AuthSignInExternal/>
    </AuthLayout>
  );
};
