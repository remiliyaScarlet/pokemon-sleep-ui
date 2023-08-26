import React from 'react';

import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {BerryId} from '@/types/game/berry';
import {ProducingRate} from '@/types/game/producing/rate';
import {TeamAnalysisRateLayoutWithQuantity} from '@/ui/team/analysis/setup/common/rateLayoutWithQuantity';
import {TeamAnalysisRateLayoutCommonProps} from '@/ui/team/analysis/setup/common/type';


type Props = TeamAnalysisRateLayoutCommonProps & {
  id: BerryId,
  rate: ProducingRate,
};

export const TeamAnalysisBerryRate = ({id, rate, period}: Props) => {
  return (
    <TeamAnalysisRateLayoutWithQuantity period={period} rate={rate} icon={
      <PokemonBerryIcon id={id}/>
    }/>
  );
};
