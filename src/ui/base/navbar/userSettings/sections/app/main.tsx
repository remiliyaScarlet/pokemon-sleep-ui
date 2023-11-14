import React from 'react';

import ComputerDesktopIcon from '@heroicons/react/24/outline/ComputerDesktopIcon';
import PuzzlePieceIcon from '@heroicons/react/24/outline/PuzzlePieceIcon';
import ServerIcon from '@heroicons/react/24/outline/ServerIcon';

import {Grid} from '@/components/layout/grid';
import {UserSettingsAppBuildInfo} from '@/ui/base/navbar/userSettings/sections/app/build';
import {UserSettingsAppCompatibility} from '@/ui/base/navbar/userSettings/sections/app/compatibility';
import {UserSettingsSection} from '@/ui/base/navbar/userSettings/sections/base';


type Props = {
  serverBuildId: string,
};

export const UserSettingsAppInfo = ({serverBuildId}: Props) => {
  return (
    <UserSettingsSection titleIcon={<PuzzlePieceIcon/>}>
      <UserSettingsAppBuildInfo
        icon={<ServerIcon/>}
        buildId={serverBuildId}
      />
      <UserSettingsAppBuildInfo
        icon={<ComputerDesktopIcon/>}
        buildId={process.env.NEXT_PUBLIC_BUILD_ID}
      />
      <Grid className="grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <UserSettingsAppCompatibility title="Array.at()" result={typeof [].at === 'function'}/>
        <UserSettingsAppCompatibility title="String.replaceAll()" result={typeof ''.replaceAll === 'function'}/>
      </Grid>
    </UserSettingsSection>
  );
};
