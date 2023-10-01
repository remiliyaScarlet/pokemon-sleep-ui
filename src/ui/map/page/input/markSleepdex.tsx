import React from 'react';

import BookmarkIcon from '@heroicons/react/24/outline/BookmarkIcon';
import {clsx} from 'clsx';

import {getTextFilterButtonClass} from '@/components/input/filter/utils/props';
import {ToggleButton} from '@/components/input/toggleButton';
import {MapInputCommonProps} from '@/ui/map/page/input/type';
import {MapPageFilter} from '@/ui/map/page/type';


export const MapInputMarkSleepdexToggle = ({filter, setFilter, isLoggedIn}: MapInputCommonProps) => {
  const {markingSleepdex} = filter;

  if (!isLoggedIn) {
    return <></>;
  }

  return (
    <ToggleButton
      id="markingSleepdex"
      active={markingSleepdex}
      onClick={() => setFilter((original) => ({
        ...original,
        markingSleepdex: !original.markingSleepdex,
      } satisfies MapPageFilter))}
      className={clsx('group', getTextFilterButtonClass(markingSleepdex))}
    >
      <div className="h-5 w-5">
        <BookmarkIcon/>
      </div>
    </ToggleButton>
  );
};
