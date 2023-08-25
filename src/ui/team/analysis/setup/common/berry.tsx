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

export const TeamAnalysisBerryRate = ({id, rate, highlight, period}: Props) => {
  return (
    <TeamAnalysisRateLayoutWithQuantity highlight={highlight} period={period} rate={rate} icon={
      <PokemonBerryIcon id={id} dimension="h-6 w-6"/>
    }/>
  );
};
