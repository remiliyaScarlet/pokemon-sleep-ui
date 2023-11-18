import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {pokemonProducingSplitIconStyle} from '@/components/shared/pokemon/production/split/const';
import {formatInt} from '@/utils/number/format';


type Props = {
  isHighlight: boolean,
  icon: React.ReactNode,
  percent: number,
};

export const PokemonProductionSplitInfo = ({isHighlight, icon, percent}: Props) => {
  return (
    <Flex direction="row" noFullWidth center className={clsx(
      pokemonProducingSplitIconStyle,
      isHighlight && 'info-highlight',
    )}>
      {icon}
      <div>{formatInt(percent)}%</div>
    </Flex>
  );
};
