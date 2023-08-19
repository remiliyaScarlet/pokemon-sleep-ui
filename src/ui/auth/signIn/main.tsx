import React from 'react';

import {redirect} from 'next/navigation';
import {getServerSession} from 'next-auth';

import {authOptions} from '@/const/auth';
import {PageProps} from '@/types/next/page';
import {AuthLayout} from '@/ui/auth/common/layout';
import {AuthSignInEmailForm} from '@/ui/auth/signIn/email';
import {AuthSignInExternal} from '@/ui/auth/signIn/external';


export const AuthSignIn = ({searchParams}: PageProps) => {
  const session = React.use(getServerSession(authOptions));

  if (session) {
    const callbackUrl = searchParams?.callbackUrl;

    if (typeof callbackUrl !== 'string') {
      redirect('/');
    }

    redirect(callbackUrl);
  }

  return (
    <AuthLayout>
      <AuthSignInEmailForm/>
      <AuthSignInExternal/>
    </AuthLayout>
  );
};
