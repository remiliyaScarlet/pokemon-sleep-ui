import React from 'react';

import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {ProducingRate} from '@/types/game/producing/rate';
import {BerryId} from '@/types/mongo/berry';
import {TeamAnalysisRateLayoutWithQuantity} from '@/ui/team/analysis/result/common/rateLayoutWithQuantity';
import {TeamAnalysisRateLayoutCommonProps} from '@/ui/team/analysis/result/common/type';


type Props = TeamAnalysisRateLayoutCommonProps & {
  id: BerryId,
  rate: ProducingRate,
};

export const TeamAnalysisBerryRate = ({id, rate, highlight}: Props) => {
  return (
    <TeamAnalysisRateLayoutWithQuantity highlight={highlight} rate={rate} icon={
      <PokemonBerryIcon id={id} dimension="h-8 w-8"/>
    }/>
  );
};
