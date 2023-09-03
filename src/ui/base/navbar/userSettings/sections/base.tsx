import React from 'react';

import {Flex} from '@/components/layout/flex';


type Props = {
  titleIcon: React.ReactNode,
};

export const UserSettingsSection = ({titleIcon, children}: React.PropsWithChildren<Props>) => {
  return (
    <Flex direction="col" className="info-section-bg gap-1.5 rounded-lg p-3">
      <div className="h-10 w-10">
        {titleIcon}
      </div>
      {children}
    </Flex>
  );
};
