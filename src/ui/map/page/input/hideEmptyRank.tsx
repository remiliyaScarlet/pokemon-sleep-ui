import React from 'react';

import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/solid/EyeSlashIcon';

import {FilterInputProps} from '@/components/input/filter/type';
import {getTextFilterButtonClass} from '@/components/input/filter/utils/props';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {imageSmallIconSizes} from '@/styles/image';
import {MapPageFilter} from '@/ui/map/page/type';
import {classNames} from '@/utils/react';


export const MapInputEmptyRankToggle = ({filter, setFilter}: FilterInputProps<MapPageFilter>) => {
  const {showEmptyRank} = filter;

  return (
    <ToggleButton
      id="showEmptyRank"
      active={filter.showEmptyRank}
      onClick={() => setFilter((original) => ({
        ...original,
        showEmptyRank: !original.showEmptyRank,
      }))}
      className={classNames('group', getTextFilterButtonClass(showEmptyRank))}
    >
      <Flex direction="row" center noFullWidth className="gap-1">
        <div className="h-5 w-5">
          {showEmptyRank ? <EyeIcon/> : <EyeSlashIcon/>}
        </div>
        <div className="relative h-7 w-7">
          <NextImage
            src="/images/generic/pokeball_unavailable.png" alt="N/A"
            sizes={imageSmallIconSizes} className="invert-hoverable"
          />
        </div>
      </Flex>
    </ToggleButton>
  );
};
