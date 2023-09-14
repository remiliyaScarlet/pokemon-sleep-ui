import React from 'react';

import ClockIcon from '@heroicons/react/24/outline/ClockIcon';

import {Flex} from '@/components/layout/flex';
import {formatFloat, formatInt} from '@/utils/number';


type Props = {
  frequency: number,
  noIcon?: boolean,
};

export const PokemonFrequencySingle = ({frequency, noIcon}: Props) => {
  const dailyCount = 86400 / frequency;

  return (
    <Flex direction="row" center noFullWidth className="gap-0.5 text-sm">
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
