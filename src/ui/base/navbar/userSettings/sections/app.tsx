import React from 'react';

import WrenchIcon from '@heroicons/react/24/solid/WrenchIcon';

import {Flex} from '@/components/layout/flex';


export const UserSettingsAppInfo = () => {
  return (
    <Flex direction="row" center className="gap-1.5 rounded-lg border border-slate-500 p-1.5 text-sm">
      <div className="h-4 w-4">
        <WrenchIcon/>
      </div>
      <div>
        {process.env.NEXT_PUBLIC_BUILD_ID}
      </div>
    </Flex>
  );
};
