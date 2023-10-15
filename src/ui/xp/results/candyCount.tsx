import React from 'react';

import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';

import {Flex} from '@/components/layout/flex/common';


type Props = {
  count: number,
};

export const PokemonExpCalculatorCandyCount = ({count}: Props) => {
  if (count > 0) {
    return Math.ceil(count);
  }

  return (
    <Flex center className="relative h-5">
      <CheckCircleIcon/>
    </Flex>
  );
};
