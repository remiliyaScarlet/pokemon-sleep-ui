import React from 'react';

import {clsx} from 'clsx';

import {InfoIcon} from '@/components/icons/info';
import {PokeboxViewType} from '@/ui/team/pokebox/viewer/type';


type Props = {
  viewType: PokeboxViewType,
  level: number,
  isLevelPreview: boolean,
};

export const PokeInBoxLevel = ({viewType, level, isLevelPreview}: Props) => {
  return (
    <InfoIcon warn={isLevelPreview} className={clsx(
      viewType === 'grid' && 'absolute bottom-1 right-1 z-20 gap-1',
    )}>
      {level}
    </InfoIcon>
  );
};
