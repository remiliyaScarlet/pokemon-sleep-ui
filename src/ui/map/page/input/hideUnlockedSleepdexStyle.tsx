import React from 'react';

import {LockOpenIcon} from '@heroicons/react/24/outline';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/solid/EyeSlashIcon';
import {clsx} from 'clsx';

import {getTextFilterButtonClass} from '@/components/input/filter/utils/props';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {MapInputCommonProps} from '@/ui/map/page/input/type';
import {MapPageFilter} from '@/ui/map/page/type';


export const MapInputUnlockedSleepStylesToggle = ({filter, setFilter, isLoggedIn}: MapInputCommonProps) => {
  const {showUnlockedSleepStyles} = filter;

  if (!isLoggedIn) {
    return <></>;
  }

  return (
    <ToggleButton
      id="showUnlockedSleepStyles"
      active={showUnlockedSleepStyles}
      onClick={() => setFilter((original) => ({
        ...original,
        showUnlockedSleepStyles: !original.showUnlockedSleepStyles,
      } satisfies MapPageFilter))}
      className={clsx('group', getTextFilterButtonClass(showUnlockedSleepStyles))}
    >
      <Flex direction="row" center noFullWidth className="gap-1">
        <div className="h-5 w-5">
          {showUnlockedSleepStyles ? <EyeIcon/> : <EyeSlashIcon/>}
        </div>
        <div className="h-5 w-5">
          <LockOpenIcon/>
        </div>
      </Flex>
    </ToggleButton>
  );
};
