import React from 'react';

import BookmarkIcon from '@heroicons/react/24/outline/BookmarkIcon';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/solid/EyeSlashIcon';
import {clsx} from 'clsx';

import {FilterInputProps} from '@/components/input/filter/type';
import {getTextFilterButtonClass} from '@/components/input/filter/utils/props';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex';
import {MapPageFilter} from '@/ui/map/page/type';


export const MapInputSleepdexStatsToggle = ({filter, setFilter}: FilterInputProps<MapPageFilter>) => {
  const {showSleepdexStats} = filter;

  return (
    <ToggleButton
      id="showSleepdexStats"
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
