import React from 'react';

import BookmarkIcon from '@heroicons/react/24/outline/BookmarkIcon';
import {clsx} from 'clsx';
import {useSession} from 'next-auth/react';

import {FilterInputProps} from '@/components/input/filter/type';
import {getTextFilterButtonClass} from '@/components/input/filter/utils/props';
import {ToggleButton} from '@/components/input/toggleButton';
import {MapPageFilter} from '@/ui/map/page/type';


export const MapInputMarkSleepdexToggle = ({filter, setFilter}: FilterInputProps<MapPageFilter>) => {
  const {markingSleepdex} = filter;

  const {status} = useSession();

  return (
    <ToggleButton
      id="markingSleepdex"
      active={markingSleepdex}
      onClick={() => setFilter((original) => ({
        ...original,
        markingSleepdex: !original.markingSleepdex,
      } satisfies MapPageFilter))}
      className={clsx('group', getTextFilterButtonClass(markingSleepdex))}
      disabled={status === 'unauthenticated'}
    >
      <div className="h-5 w-5">
        <BookmarkIcon/>
      </div>
    </ToggleButton>
  );
};
