import React from 'react';

import ClockIcon from '@heroicons/react/24/outline/ClockIcon';
import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex';
import {durationOfDay} from '@/const/common';
import {formatFloat, formatInt} from '@/utils/number';


type Props = {
  frequency: number,
  noIcon?: boolean,
  normalText?: boolean,
};

export const PokemonFrequencySingle = ({frequency, noIcon, normalText}: Props) => {
  const dailyCount = durationOfDay / frequency;

  return (
    <Flex direction="row" center noFullWidth className={clsx('gap-0.5', !normalText && 'text-sm')}>
      {
        !noIcon &&
        <div className="h-4 w-4">
          <ClockIcon/>
        </div>
      }
      <div>{formatInt(frequency)}</div>
      <div>({formatFloat(dailyCount)}x)</div>
    </Flex>
  );
};
