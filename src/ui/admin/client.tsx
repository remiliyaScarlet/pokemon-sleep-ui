'use client';
import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {SiteAdminGenerateActivation} from '@/ui/admin/generate/main';


export const SiteAdminClient = () => {
  return (
    <Flex className="gap-2">
      <SiteAdminGenerateActivation/>
    </Flex>
  );
};
