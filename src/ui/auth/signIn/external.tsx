'use client';
import React from 'react';

import {Flex} from '@/components/layout/flex';
import {AuthSignInExternalProvider} from '@/ui/auth/signIn/provider';


export const AuthSignInExternal = () => {
  return (
    <Flex direction="col" center className="info-section">
      <AuthSignInExternalProvider provider="google" text="Google"/>
    </Flex>
  );
};
