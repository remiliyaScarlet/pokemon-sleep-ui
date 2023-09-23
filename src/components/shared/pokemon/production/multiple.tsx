import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex';
import {PokemonFrequencySingle} from '@/components/shared/pokemon/frequency/single';
import {PokemonProducingRateContent} from '@/components/shared/pokemon/production/content';
import {PokemonProducingRateProps} from '@/components/shared/pokemon/production/type';
import {ProducingRateOfItem} from '@/types/game/producing/rate';
import {toSum} from '@/utils/array';


type Props = PokemonProducingRateProps & {
  rates: ProducingRateOfItem[],
  getIcon: (rate: ProducingRateOfItem) => React.ReactNode,
};

export const PokemonProducingRateMultiple = ({rates, getIcon, horizontal, ...props}: Props) => {
  const totalDaily = toSum(rates.map(({dailyEnergy}) => dailyEnergy));

  return (
    <Flex direction={horizontal ? 'row' : 'col'} wrap className={clsx(
      'gap-1',
      horizontal ? 'items-center justify-end' : 'items-end justify-center',
    )}>
      <PokemonFrequencySingle frequency={rates.at(0)?.frequency ?? NaN}/>
      {rates.map((rate) => (
        <PokemonProducingRateContent key={rate.id} dailyRate={rate.quantity} icon={getIcon(rate)} {...props}/>
      ))}
      <PokemonProducingRateContent dailyRate={totalDaily} {...props}/>
    </Flex>
  );
};
