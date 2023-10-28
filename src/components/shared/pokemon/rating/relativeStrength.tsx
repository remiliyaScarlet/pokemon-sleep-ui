import React from 'react';

import ArrowsUpDownIcon from '@heroicons/react/24/outline/ArrowsUpDownIcon';
import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {getNumberStyles} from '@/styles/text/number';
import {Dimension} from '@/types/style';
import {formatFloat} from '@/utils/number/format';


type Props = {
  baseDiffPercent: number,
  iconDimension?: Dimension,
  className?: string,
};

export const PokemonRatingRelativeStrength = ({baseDiffPercent, iconDimension, className}: Props) => {
  return (
    <Flex direction="row" center noFullWidth className={clsx(
      'group gap-1 whitespace-nowrap',
      getNumberStyles({num: baseDiffPercent}),
      className,
    )}>
      <div className={iconDimension ?? 'h-4 w-4'}>
        <ArrowsUpDownIcon/>
      </div>
      <div>
        {baseDiffPercent > 0 && '+'}{isNaN(baseDiffPercent) ? '-' : formatFloat(baseDiffPercent)}%
      </div>
    </Flex>
  );
};
