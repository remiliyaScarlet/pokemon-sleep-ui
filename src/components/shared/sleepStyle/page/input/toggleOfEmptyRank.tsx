import React from 'react';

import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/solid/EyeSlashIcon';
import {clsx} from 'clsx';

import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {UnavailableIcon} from '@/components/shared/common/unavailable';
import {MapInputCommonProps} from '@/components/shared/sleepStyle/page/input/type';
import {MapPageFilter} from '@/components/shared/sleepStyle/page/type';
import {textFilterButtonStyle} from '@/styles/input';


export const MapInputEmptyRankToggle = ({filter, setFilter}: MapInputCommonProps) => {
  const {showEmptyRank} = filter;

  return (
    <ToggleButton
      active={showEmptyRank}
      onClick={() => setFilter((original) => ({
        ...original,
        showEmptyRank: !original.showEmptyRank,
      } satisfies MapPageFilter))}
      className={clsx('group', textFilterButtonStyle)}
    >
      <Flex direction="row" center noFullWidth>
        <div className="h-5 w-5">
          {showEmptyRank ? <EyeIcon/> : <EyeSlashIcon/>}
        </div>
        <UnavailableIcon dimension="h-7 w-7"/>
      </Flex>
    </ToggleButton>
  );
};
