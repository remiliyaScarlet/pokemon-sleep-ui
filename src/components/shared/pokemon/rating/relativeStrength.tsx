import React from 'react';

import ArrowsUpDownIcon from '@heroicons/react/24/outline/ArrowsUpDownIcon';
import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex';
import {Dimension} from '@/types/style';
import {formatFloat} from '@/utils/number';


type Props = {
  baseDiffPercent: number,
  iconDimension?: Dimension,
  className?: string,
};

export const PokemonRatingRelativeStrength = ({baseDiffPercent, iconDimension, className}: Props) => {
  return (
    <Flex direction="row" center noFullWidth className={clsx(
      'gap-1 whitespace-nowrap',
      baseDiffPercent > 0 && 'text-green-700 dark:text-green-300',
      baseDiffPercent < 0 && 'text-red-700 dark:text-red-300',
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
