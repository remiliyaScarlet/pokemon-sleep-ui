import React from 'react';

import ClockIcon from '@heroicons/react/24/outline/ClockIcon';

import {Flex} from '@/components/layout/flex';
import {formatFloat, formatInt} from '@/utils/number';


type Props = {
  frequency: number,
};

export const PokemonFrequencySingle = ({frequency}: Props) => {
  const dailyCount = 86400 / frequency;

  return (
    <Flex direction="row" center noFullWidth className="gap-0.5 text-sm">
      <div className="relative h-4 w-4">
        <ClockIcon/>
      </div>
      <div>{formatInt(frequency)}</div>
      <div>({formatFloat(dailyCount)}x)</div>
    </Flex>
  );
};
