import React from 'react';

import {Flex} from '@/components/layout/flex';
import {PokemonProducingRateSingle} from '@/components/shared/pokemon/rate/single';
import {PokemonProducingRateProps} from '@/components/shared/pokemon/rate/type';
import {ProducingRate} from '@/types/game/pokemon';


type Props = PokemonProducingRateProps & {
  rate: ProducingRate,
  icon: React.ReactNode,
};

export const PokemonProducingRate = ({rate, icon, ...props}: Props) => {
  return (
    <Flex direction="col">
      <PokemonProducingRateSingle dailyRate={rate.dailyEnergy} {...props}/>
      <PokemonProducingRateSingle dailyRate={rate.quantity} icon={icon} {...props}/>
    </Flex>
  );
};
