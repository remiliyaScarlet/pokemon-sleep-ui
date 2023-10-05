import React from 'react';

import {PokemonProductionSplit} from '@/components/shared/pokemon/production/split/main';
import {PokemonSpecialtyId} from '@/types/game/pokemon';
import {PokemonProducingRate} from '@/types/game/producing/rate';
import {ProducingStateOfRate} from '@/types/game/producing/state';
import {toSum} from '@/utils/array';


type Props = {
  rate: PokemonProducingRate,
  state: ProducingStateOfRate,
  specialty: PokemonSpecialtyId | null,
};

export const PokemonProductionSplitFromPokemonRate = ({rate, state, specialty}: Props) => {
  const {berry, ingredient} = rate;

  return (
    <PokemonProductionSplit
      berry={berry.energy.equivalent}
      ingredient={toSum(Object.values(ingredient).map(({energy}) => energy[state]))}
      specialty={specialty}
    />
  );
};
