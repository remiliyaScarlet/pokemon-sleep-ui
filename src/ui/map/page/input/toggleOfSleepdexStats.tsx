import React from 'react';

import BookmarkIcon from '@heroicons/react/24/outline/BookmarkIcon';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/solid/EyeSlashIcon';
import {clsx} from 'clsx';

import {getTextFilterButtonClass} from '@/components/input/filter/utils/props';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {MapInputCommonProps} from '@/ui/map/page/input/type';
import {MapPageFilter} from '@/ui/map/page/type';


export const MapInputSleepdexStatsToggle = ({filter, setFilter, isLoggedIn}: MapInputCommonProps) => {
  const {showSleepdexStats} = filter;

  if (!isLoggedIn) {
    return <></>;
  }

  return (
    <ToggleButton
      id="toggleSleepdexStats"
      active={showSleepdexStats}
      onClick={() => setFilter((original) => ({
        ...original,
        showSleepdexStats: !original.showSleepdexStats,
      } satisfies MapPageFilter))}
      className={clsx('group', getTextFilterButtonClass(showSleepdexStats))}
    >
      <Flex direction="row" center noFullWidth className="gap-1">
        <div className="h-5 w-5">
          {showSleepdexStats ? <EyeIcon/> : <EyeSlashIcon/>}
        </div>
        <div className="h-5 w-5">
          <BookmarkIcon/>
        </div>
      </Flex>
    </ToggleButton>
  );
};
