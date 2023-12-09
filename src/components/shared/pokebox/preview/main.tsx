import React from 'react';

import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import {clsx} from 'clsx';

import {FilterInputOnClickProps} from '@/components/input/filter/common/type';
import {FilterExpandedInput} from '@/components/input/filter/expanded/main';
import {Flex} from '@/components/layout/flex/common';
import {LevelIcon} from '@/components/shared/icon/lv';
import {PokeboxPreviewLevel, pokeboxPreviewLevel} from '@/components/shared/pokebox/preview/type';
import {iconFilterButtonStyle} from '@/styles/input';


export const PokeboxPreviewLevelInput = (props: FilterInputOnClickProps<PokeboxPreviewLevel>) => {
  return (
    <FilterExpandedInput
      title={
        <Flex direction="row" center className="gap-1.5">
          <EyeIcon className="h-6 w-6"/>
          <LevelIcon/>
        </Flex>
      }
      ids={[null, ...[...pokeboxPreviewLevel].sort((a, b) => a - b)]}
      idToButton={(level) => (
        level === null ? <XMarkIcon className="h-7 w-7"/> : level
      )}
      className={clsx('text-sm', iconFilterButtonStyle)}
      {...props}
    />
  );
};
