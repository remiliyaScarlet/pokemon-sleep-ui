import React from 'react';

import EnvelopeIcon from '@heroicons/react/24/outline/EnvelopeIcon';
import {getServerSession} from 'next-auth';

import {Link, redirect} from '@/components/i18n';
import {Flex} from '@/components/layout/flex/common';
import {authOptions} from '@/const/auth';
import {DefaultPageProps} from '@/types/next/page';
import {AuthLayout} from '@/ui/auth/common/layout';
import {AuthSignInExternal} from '@/ui/auth/signIn/external';


export const AuthSignIn = async ({params, searchParams}: DefaultPageProps) => {
  const {locale} = params;
  const session = await getServerSession(authOptions);

  if (session) {
    const callbackUrl = searchParams?.callbackUrl;

    if (typeof callbackUrl !== 'string') {
      redirect('/');
      return;
    }

    redirect(callbackUrl);
  }

  return (
    <AuthLayout locale={locale}>
      <AuthSignInExternal/>
      <Flex className="items-end">
        <Link href={'/auth/sign-in/email'} className="border-link w-fit">
          <Flex direction="row" noFullWidth center className="gap-1.5">
            <div className="h-6 w-6">
              <EnvelopeIcon/>
            </div>
            <div>
              Email
            </div>
          </Flex>
        </Link>
      </Flex>
    </AuthLayout>
  );
};
