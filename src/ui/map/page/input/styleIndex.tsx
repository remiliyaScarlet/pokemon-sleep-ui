import React from 'react';

import Image from 'next/image';

import {FilterTextInput} from '@/components/input/filter/text';
import {FilterInputProps} from '@/components/input/filter/type';
import {getMultiSelectOnClickProps} from '@/components/input/filter/utils/props';
import {imageSmallIconSizes} from '@/styles/image';
import {SleepStyleId} from '@/types/mongo/sleepStyle';
import {MapPageFilter} from '@/ui/map/page/type';


type Props = FilterInputProps<MapPageFilter> & {
  sleepStyles: SleepStyleId[],
};

export const MapInputSleepStyleToggle = ({filter, setFilter, sleepStyles}: Props) => {
  const {sleepStyle} = filter;

  return (
    <FilterTextInput
      style="none"
      title={<></>}
      idToItemId={(id) => `SleepStyle-${id}`}
      idToButton={(id) => {
        if (id === 'onSnorlax') {
          return (
            <div className="relative h-4 w-4">
              <Image
                src="/images/generic/flash.png" alt={id} fill sizes={imageSmallIconSizes}
                className={sleepStyle.onSnorlax ? 'invert-on-dark' : 'invert-on-light'}
              />
            </div>
          );
        }

        return `#${id}`;
      }}
      ids={sleepStyles}
      {...getMultiSelectOnClickProps({
        filter,
        setFilter,
        filterKey: 'sleepStyle',
      })}
    />
  );
};
