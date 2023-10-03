import React from 'react';

import {redirect} from 'next/navigation';
import {getServerSession} from 'next-auth';

import {Flex} from '@/components/layout/flex/common';
import {authOptions} from '@/const/auth';
import {isAdmin} from '@/controller/user/account/common';
import {generateActivationKey} from '@/controller/user/account/key';
import {PageProps} from '@/types/next/page';


const AdsFreeGenerateKey = async ({searchParams}: PageProps) => {
  const session = await getServerSession(authOptions);

  const executorUserId = session?.user.id;
  const isUserAdmin = isAdmin(executorUserId);

  if (!session || !executorUserId || !isUserAdmin) {
    redirect('/');
  }

  const expiryDateString = searchParams?.expiry;
  if (typeof expiryDateString !== 'string' || !expiryDateString) {
    redirect('/');
  }

  const activationKey = await generateActivationKey(executorUserId, expiryDateString);

  return (
    <Flex center className="h-screen">
      <pre>{`${process.env.NEXTAUTH_URL}/account/adsFree/activate?key=${activationKey}`}</pre>
    </Flex>
  );
};

export default AdsFreeGenerateKey;
