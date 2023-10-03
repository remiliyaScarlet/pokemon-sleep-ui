import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {PokemonIngredientRate} from '@/components/shared/pokemon/production/ingredientRate';
import {specialtyIdMap} from '@/const/game/pokemon';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {getPokemonProducingParams} from '@/utils/game/producing/pokemon';


export const PokeInBoxGridInfo = ({pokemon, pokemonProducingParamsMap, pokeInBox}: PokeInBoxCommonProps) => {
  const {ingredients} = pokeInBox;
  const {id, specialty, berry} = pokemon;

  const pokemonProducingParams = getPokemonProducingParams({
    pokemonId: id,
    pokemonProducingParamsMap,
  });

  return (
    <Flex noFullWidth className="gap-1">
      <Flex direction="row" noFullWidth className="items-center gap-1">
        <Flex direction="row" noFullWidth className={clsx(
          'items-center gap-1 px-1',
          specialty === specialtyIdMap.berry && 'bg-blink',
        )}>
          <PokemonBerryIcon id={berry.id}/>
          <div>{berry.quantity}</div>
        </Flex>
        <div className={clsx('px-2', specialty === specialtyIdMap.ingredient && 'bg-blink')}>
          <PokemonIngredientIcons ingredients={[Object.values(ingredients)]} noLink/>
        </div>
      </Flex>
      <div className="px-1">
        <PokemonIngredientRate split={pokemonProducingParams.ingredientSplit}/>
      </div>
    </Flex>
  );
};
