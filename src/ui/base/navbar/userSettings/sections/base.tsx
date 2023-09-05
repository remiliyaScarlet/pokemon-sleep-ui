import React from 'react';

import {Flex} from '@/components/layout/flex';


type Props = {
  titleIcon: React.ReactNode,
};

export const UserSettingsSection = ({titleIcon, children}: React.PropsWithChildren<Props>) => {
  return (
    <Flex direction="col" className="gap-1.5 rounded-lg bg-slate-500/10 p-3">
      <div className="relative h-10 w-10">
        {titleIcon}
      </div>
      {children}
    </Flex>
  );
};
