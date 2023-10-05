import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';

import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {ProducingRateUI} from '@/components/shared/production/rate/main';
import {IngredientId} from '@/types/game/ingredient';
import {ProducingRate} from '@/types/game/producing/rate';
import {applyPeriodMultiplierToRate} from '@/utils/game/producing/apply';


type Props = {
  id: IngredientId | undefined,
  rate: ProducingRate | null,
};

export const TeamAnalysisIngredientRate = ({id, rate}: Props) => {
  if (!id || !rate) {
    return (
      <ProducingRateUI
        rate={null}
        getIcon={(dimension) => <XCircleIcon className={dimension}/>}
      />
    );
  }

  return (
    <ProducingRateUI
      rate={applyPeriodMultiplierToRate(rate)}
      getIcon={(dimension) => <PokemonIngredientIcon id={id} dimension={dimension}/>}
    />
  );
};
