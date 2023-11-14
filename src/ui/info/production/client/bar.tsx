import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {ProducingParamsMaximum} from '@/ui/info/production/client/type';


type Props = {
  params: PokemonProducingParams,
  maximum: ProducingParamsMaximum,
};

export const ProducingParamsBar = ({params, maximum}: Props) => {
  const {
    ingredientSplit,
    skillPercent,
  } = params;

  return (
    <Flex direction="row" className="transform-smooth h-1 justify-between">
      <div
        className="transform-smooth h-1 bg-yellow-500"
        style={{width: `${(ingredientSplit ?? 0) / maximum.ingredientRate * 50}%`}}
      />
      <div
        className="transform-smooth h-1 bg-sky-500"
        style={{width: `${(skillPercent ?? 0) / maximum.skillRate * 50}%`}}
      />
    </Flex>
  );
};
