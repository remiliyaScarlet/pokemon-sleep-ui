'use client';
import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {UserActivationGenerator} from '@/ui/admin/activation/generate/main';
import {UserActivationViewer} from '@/ui/admin/activation/viewer/main';
import {SiteAdminDataProps} from '@/ui/admin/type';


export const SiteAdminClient = (props: SiteAdminDataProps) => {
  return (
    <Flex className="gap-2">
      <UserActivationGenerator/>
      <Flex className="gap-2 lg:flex-row">
        <UserActivationViewer source="discord" {...props}/>
        <UserActivationViewer source="patreon" {...props}/>
      </Flex>
    </Flex>
  );
};
