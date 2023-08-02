import React from 'react';

import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';

import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredientIcon';
import {ProductionRate} from '@/types/game/pokemon';
import {IngredientId} from '@/types/mongo/ingredient';
import {EnergyRateLayout} from '@/ui/energy/analysis/result/rate';


type Props = {
  id: IngredientId | undefined,
  rate: ProductionRate,
};

export const EnergyAnalysisOnIngredient = ({id, rate}: Props) => {
  if (!id) {
    return (
      <EnergyRateLayout rate={rate}>
        <div className="h-8 w-8">
          <XMarkIcon/>
        </div>
      </EnergyRateLayout>
    );
  }

  return (
    <EnergyRateLayout rate={rate}>
      <PokemonIngredientIcon id={id} dimension="h-8 w-8"/>
    </EnergyRateLayout>
  );
};
