import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';

import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredientIcon';
import {ProductionRate} from '@/types/game/pokemon';
import {IngredientId} from '@/types/mongo/ingredient';
import {TeamAnalysisRateLayoutWithQuantity} from '@/ui/team/analysis/result/common/rateLayoutWithQuantity';


type Props = {
  id: IngredientId | undefined,
  rate: ProductionRate | null,
};

export const TeamAnalysisIngredientRate = ({id, rate}: Props) => {
  if (!id || !rate) {
    return (
      <TeamAnalysisRateLayoutWithQuantity rate={null} icon={<XCircleIcon/>}/>
    );
  }

  return (
    <TeamAnalysisRateLayoutWithQuantity rate={rate} icon={
      <PokemonIngredientIcon id={id} dimension="h-8 w-8"/>
    }/>
  );
};
