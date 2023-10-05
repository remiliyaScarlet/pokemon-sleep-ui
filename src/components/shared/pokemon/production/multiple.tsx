import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {PokemonFrequency} from '@/components/shared/pokemon/frequency/main';
import {PokemonProducingRateProps} from '@/components/shared/pokemon/production/type';
import {ProducingRateContent} from '@/components/shared/production/rate/content';
import {ProducingRateOfStates} from '@/types/game/producing/rate';
import {toSum} from '@/utils/array';


type Props = PokemonProducingRateProps & {
  rates: ProducingRateOfStates[],
  getIcon: (rate: ProducingRateOfStates) => React.ReactNode,
};

export const PokemonProducingRateMultiple = ({horizontal, hideFrequency, rates, getIcon}: Props) => {
  const totalDaily = toSum(rates.map(({dailyEnergy}) => dailyEnergy.equivalent));

  return (
    <Flex direction={horizontal ? 'row' : 'col'} wrap className={clsx(
      'gap-1',
      horizontal ? 'items-center justify-end' : 'items-end justify-center',
    )}>
      {!hideFrequency && <PokemonFrequency frequency={rates.at(0)?.frequency.equivalent ?? NaN}/>}
      {rates.map((rate) => (
        <ProducingRateContent key={rate.id} dailyRate={rate.quantity.equivalent} icon={getIcon(rate)}/>
      ))}
      <ProducingRateContent dailyRate={totalDaily} isEnergy/>
    </Flex>
  );
};
