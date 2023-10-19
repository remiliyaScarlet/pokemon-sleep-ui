'use client';
import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {UserActivationGenerator} from '@/ui/admin/activation/generate/main';
import {UserActivationStats} from '@/ui/admin/activation/stats/main';
import {UserActivationViewer} from '@/ui/admin/activation/viewer/main';
import {useUserActivationPopup} from '@/ui/admin/activation/viewer/popup/hook';
import {UserActivationPopup} from '@/ui/admin/activation/viewer/popup/main';
import {SiteAdminDataProps} from '@/ui/admin/type';


export const SiteAdminClient = (props: SiteAdminDataProps) => {
  const popup = useUserActivationPopup();

  return (
    <Flex className="gap-2">
      <UserActivationPopup state={popup} {...props}/>
      <UserActivationGenerator/>
      <UserActivationStats {...props}/>
      <Flex className="gap-2 lg:flex-row">
        <UserActivationViewer source="discord" popup={popup} {...props}/>
        <UserActivationViewer source="patreon" popup={popup} {...props}/>
      </Flex>
    </Flex>
  );
};
