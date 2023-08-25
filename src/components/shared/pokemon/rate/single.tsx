import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex';
import {PokemonProducingRateContent} from '@/components/shared/pokemon/rate/content';
import {PokemonProducingRateProps} from '@/components/shared/pokemon/rate/type';
import {ProducingRate} from '@/types/game/producing/rate';


type Props = PokemonProducingRateProps & {
  rate: ProducingRate | null,
  icon: React.ReactNode,
};

export const PokemonProducingRateSingle = ({rate, icon, horizontal, ...props}: Props) => {
  return (
    <Flex direction={horizontal ? 'row' : 'col'} className={clsx(
      horizontal && 'items-center justify-end md:flex-row md:gap-1',
      !horizontal && 'items-end justify-center',
    )}>
      <PokemonProducingRateContent dailyRate={rate?.quantity} icon={icon} {...props}/>
      <PokemonProducingRateContent dailyRate={rate?.dailyEnergy} {...props}/>
    </Flex>
  );
};
