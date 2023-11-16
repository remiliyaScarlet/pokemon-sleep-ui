import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PokemonFrequency} from '@/components/shared/pokemon/frequency/main';
import {PokemonProducingRateSingleProps} from '@/components/shared/pokemon/production/single/type';
import {ProducingRateUI} from '@/components/shared/production/rate/main';
import {toProducingRateOfState} from '@/utils/game/producing/convert';


export const PokemonProducingRateSingleAtItem = ({
  hideFrequency,
  rate,
  getIcon,
  state = 'equivalent',
}: Pick<PokemonProducingRateSingleProps, 'hideFrequency' | 'rate' | 'getIcon' | 'state'>) => (
  <Flex noFullWidth className="items-end gap-0.5">
    {!hideFrequency && <PokemonFrequency frequency={rate?.frequency[state] ?? NaN}/>}
    <ProducingRateUI
      rate={rate && toProducingRateOfState({rate, state})}
      getIcon={getIcon}
    />
  </Flex>
);
