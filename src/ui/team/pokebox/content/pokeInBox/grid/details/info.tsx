import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {specialtyIdMap} from '@/const/game/pokemon';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';


export const PokeInBoxGridInfo = ({pokemon, pokeInBox}: PokeInBoxCommonProps) => {
  const {ingredients} = pokeInBox;
  const {specialty, berry} = pokemon;

  return (
    <Flex direction="col" noFullWidth className="items-center gap-1">
      <Flex direction="row" noFullWidth className={clsx(
        'items-center gap-1 px-2',
        specialty === specialtyIdMap.berry && 'bg-blink',
      )}>
        <PokemonBerryIcon id={berry.id}/>
        <div>{berry.quantity}</div>
      </Flex>
      <div className={clsx('px-2', specialty === specialtyIdMap.ingredient && 'bg-blink')}>
        <PokemonIngredientIcons ingredients={[Object.values(ingredients)]} noLink/>
      </div>
    </Flex>
  );
};
