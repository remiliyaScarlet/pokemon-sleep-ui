'use client';
import React from 'react';

import {ActivationUI} from '@/ui/admin/activation/main';
import {SiteAdminServerDataProps} from '@/ui/admin/type';


export const SiteAdminClient = (props: SiteAdminServerDataProps) => {
  return <ActivationUI {...props}/>;
};
