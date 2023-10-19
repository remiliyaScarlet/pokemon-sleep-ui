'use client';
import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {SiteAdminGenerateActivation} from '@/ui/admin/generate/main';
import {SiteAdminDataProps} from '@/ui/admin/type';
import {SiteAdminViewer} from '@/ui/admin/viewer/main';


export const SiteAdminClient = (props: SiteAdminDataProps) => {
  return (
    <Flex className="gap-2">
      <SiteAdminGenerateActivation/>
      <SiteAdminViewer {...props}/>
    </Flex>
  );
};
