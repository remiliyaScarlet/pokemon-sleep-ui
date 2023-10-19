import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {UserActivationDataAtClient} from '@/ui/admin/activation/type';
import {SiteAdminDataProps} from '@/ui/admin/type';


type Props = SiteAdminDataProps & {
  title: string,
  filter: (data: UserActivationDataAtClient) => boolean,
};

export const UserActivationStatsUnit = ({activations, title, filter}: Props) => {
  const filtered = activations.filter(filter);

  return (
    <Flex direction="row" className="items-end justify-center gap-1">
      <div className="text-slate-600 dark:text-slate-400">{title}</div>
      <div className="text-2xl">{filtered.length}</div>
    </Flex>
  );
};
