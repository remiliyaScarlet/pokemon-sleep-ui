import React from 'react';

import BookmarkIcon from '@heroicons/react/24/outline/BookmarkIcon';
import {clsx} from 'clsx';

import {ToggleButton} from '@/components/input/toggleButton';
import {MapInputWithDataProps} from '@/components/shared/sleepStyle/page/input/type';
import {MapPageFilter} from '@/components/shared/sleepStyle/page/type';
import {textFilterButtonStyle} from '@/styles/input';


export const MapInputMarkSleepdexToggle = ({filter, setFilter, isLoggedIn}: MapInputWithDataProps) => {
  const {markingSleepdex} = filter;

  if (!isLoggedIn) {
    return null;
  }

  return (
    <ToggleButton
      active={markingSleepdex}
      onClick={() => setFilter((original) => ({
        ...original,
        markingSleepdex: !original.markingSleepdex,
      } satisfies MapPageFilter))}
      className={clsx('group', textFilterButtonStyle)}
    >
      <div className="h-5 w-5">
        <BookmarkIcon/>
      </div>
    </ToggleButton>
  );
};
