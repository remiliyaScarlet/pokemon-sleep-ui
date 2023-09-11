import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex';
import {PokemonFrequencySingle} from '@/components/shared/pokemon/frequency/single';
import {PokemonProducingRateContent} from '@/components/shared/pokemon/production/content';
import {PokemonProducingRateProps} from '@/components/shared/pokemon/production/type';
import {ProducingRateOfItem} from '@/types/game/producing/rate';


type Props = PokemonProducingRateProps & {
  rate: ProducingRateOfItem | null,
  icon: React.ReactNode,
};

export const PokemonProducingRateSingle = ({rate, icon, horizontal, ...props}: Props) => {
  return (
    <Flex direction={horizontal ? 'row' : 'col'} wrap className={clsx(
      'gap-1',
      horizontal && 'items-center justify-end md:flex-row',
      !horizontal && 'items-end justify-center',
    )}>
      <PokemonFrequencySingle frequency={rate?.frequency ?? NaN}/>
      <Flex direction="row" noFullWidth className="gap-1">
        <PokemonProducingRateContent dailyRate={rate?.quantity} icon={icon} {...props}/>
        <PokemonProducingRateContent dailyRate={rate?.dailyEnergy} {...props}/>
      </Flex>
    </Flex>
  );
};
