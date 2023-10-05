import React from 'react';

import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {ProducingRateUI} from '@/components/shared/production/rate/main';
import {BerryId} from '@/types/game/berry';
import {ProducingRate} from '@/types/game/producing/rate';
import {applyPeriodMultiplierToRate} from '@/utils/game/producing/apply';


type Props = {
  id: BerryId,
  rate: ProducingRate,
};

export const TeamAnalysisBerryRate = ({id, rate}: Props) => {
  return (
    <ProducingRateUI
      rate={applyPeriodMultiplierToRate(rate)}
      getIcon={(dimension) => <PokemonBerryIcon id={id} dimension={dimension}/>}
    />
  );
};
