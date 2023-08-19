'use client';
import React from 'react';

import ArrowTopRightOnSquareIcon from '@heroicons/react/24/outline/ArrowTopRightOnSquareIcon';
import {signIn} from 'next-auth/react';

import {Flex} from '@/components/layout/flex';


export const AuthSignInExternal = () => {
  return (
    <Flex direction="col" center className="info-section">
      <button className="button-clickable-bg w-1/2 p-2 md:w-1/3" onClick={() => signIn('google')}>
        <Flex direction="row" noFullWidth center className="gap-1.5">
          <div className="h-6 w-6">
            <ArrowTopRightOnSquareIcon/>
          </div>
          <div>
            Google
          </div>
        </Flex>
      </button>
    </Flex>
  );
};
