import React from 'react';

import {Flex} from '@/components/layout/flex';
import {PokemonProductionRateSingle} from '@/components/shared/pokemon/rate/single';
import {PokemonProductionRateProps} from '@/components/shared/pokemon/rate/type';
import {ProductionRate} from '@/types/game/pokemon';


type Props = PokemonProductionRateProps & {
  rate: ProductionRate,
  icon: React.ReactNode,
};

export const PokemonProductionRate = ({rate, icon, ...props}: Props) => {
  return (
    <Flex direction="col">
      <PokemonProductionRateSingle dailyRate={rate.dailyEnergy} {...props}/>
      <PokemonProductionRateSingle dailyRate={rate.quantity} icon={icon} {...props}/>
    </Flex>
  );
};
