import React from 'react';

import WrenchIcon from '@heroicons/react/24/solid/WrenchIcon';

import {Flex} from '@/components/layout/flex/common';
import {UserSettingsAppInfoIcon} from '@/ui/base/navbar/userSettings/sections/app/icon';


type Props = {
  icon: React.ReactNode,
  buildId: string | undefined,
};

export const UserSettingsAppBuildInfo = ({icon, buildId}: Props) => {
  return (
    <Flex direction="row" center className="items-center gap-1.5 rounded-lg border border-slate-500 p-1.5 text-sm">
      <UserSettingsAppInfoIcon icon={icon}/>
      <UserSettingsAppInfoIcon icon={<WrenchIcon/>}/>
      <code className="truncate">
        {buildId ?? '(N/A)'}
      </code>
    </Flex>
  );
};
