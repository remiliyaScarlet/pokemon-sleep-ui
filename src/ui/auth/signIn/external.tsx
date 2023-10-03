'use client';
import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {AuthSignInProvider} from '@/ui/auth/signIn/provider';


export const AuthSignInExternal = () => {
  return (
    <Flex center className="info-section">
      <AuthSignInProvider provider="google" text="Google"/>
    </Flex>
  );
};
