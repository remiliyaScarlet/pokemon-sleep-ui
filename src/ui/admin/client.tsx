'use client';
import React from 'react';

import {UserActivationUI} from '@/ui/admin/activation/main';
import {SiteAdminDataProps} from '@/ui/admin/type';


export const SiteAdminClient = (props: SiteAdminDataProps) => {
  return <UserActivationUI {...props}/>;
};
