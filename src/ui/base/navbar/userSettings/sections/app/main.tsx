import React from 'react';

import PuzzlePieceIcon from '@heroicons/react/24/outline/PuzzlePieceIcon';
import WrenchIcon from '@heroicons/react/24/solid/WrenchIcon';

import {Flex} from '@/components/layout/flex';
import {Grid} from '@/components/layout/grid';
import {UserSettingsAppCompatibility} from '@/ui/base/navbar/userSettings/sections/app/compatibility';
import {UserSettingsSection} from '@/ui/base/navbar/userSettings/sections/base';


export const UserSettingsAppInfo = () => {
  return (
    <UserSettingsSection titleIcon={<PuzzlePieceIcon/>}>
      <Flex direction="row" center className="gap-1.5 rounded-lg border border-slate-500 p-1.5 text-sm">
        <div className="h-4 w-4">
          <WrenchIcon/>
        </div>
        <div className="truncate">
          {process.env.NEXT_PUBLIC_BUILD_ID}
        </div>
      </Flex>
      <Grid className="grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <UserSettingsAppCompatibility title="Array.at()" result={typeof [].at === 'function'}/>
        <UserSettingsAppCompatibility title="String.replaceAll()" result={typeof ''.replaceAll === 'function'}/>
      </Grid>
    </UserSettingsSection>
  );
};
