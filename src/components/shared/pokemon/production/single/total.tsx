import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PokemonProducingRateSingleProps} from '@/components/shared/pokemon/production/single/type';
import {ProducingRateContent} from '@/components/shared/production/rate/content';


export const PokemonProducingRateSingleAtTotal = ({
  infoAtTotal,
  dailyTotalEnergy,
}: PokemonProducingRateSingleProps) => {
  return (
    <Flex noFullWidth className="items-end gap-0.5">
      {infoAtTotal}
      <ProducingRateContent key="dailyTotal" dailyRate={dailyTotalEnergy} isEnergy/>
    </Flex>
  );
};
