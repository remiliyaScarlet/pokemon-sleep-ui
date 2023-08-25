import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';

import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {IngredientId} from '@/types/game/ingredient';
import {ProducingRate} from '@/types/game/producing/rate';
import {TeamAnalysisRateLayoutWithQuantity} from '@/ui/team/analysis/setup/common/rateLayoutWithQuantity';
import {TeamAnalysisRateLayoutCommonProps} from '@/ui/team/analysis/setup/common/type';


type Props = TeamAnalysisRateLayoutCommonProps & {
  id: IngredientId | undefined,
  rate: ProducingRate | null,
};

export const TeamAnalysisIngredientRate = ({id, rate, highlight, period}: Props) => {
  if (!id || !rate) {
    return (
      <TeamAnalysisRateLayoutWithQuantity rate={null} period={period} icon={<XCircleIcon/>}/>
    );
  }

  return (
    <TeamAnalysisRateLayoutWithQuantity highlight={highlight} rate={rate} period={period} icon={
      <PokemonIngredientIcon id={id} dimension="h-6 w-6"/>
    }/>
  );
};
