import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {PokemonSleepType} from '@/components/shared/pokemon/sleepType/main';
import {PokemonSpecialty} from '@/components/shared/pokemon/specialty/main';
import {specialtyIdMap} from '@/const/game/pokemon';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';


export const PokeInBoxInfo = ({pokemon, pokeInBox}: PokeInBoxCommonProps) => {
  const {ingredients} = pokeInBox;
  const {sleepType, specialty, berry} = pokemon;

  return (
    <Flex direction="row" className="items-center gap-2">
      <Flex direction="col" noFullWidth className="items-center gap-1">
        <Flex direction="row" noFullWidth className={clsx(
          'items-center gap-1 px-1',
          specialty === specialtyIdMap.berry && 'bg-blink',
        )}>
          <PokemonBerryIcon id={berry.id}/>
          <div>{berry.quantity}</div>
        </Flex>
        <div className={clsx(specialty === specialtyIdMap.ingredient && 'bg-blink')}>
          <PokemonIngredientIcons
            ingredients={[Object.values(ingredients)]}
          />
        </div>
      </Flex>
      <Flex direction="col" className="gap-1.5">
        <PokemonSleepType sleepType={sleepType} dimension="h-4 w-4"/>
        <PokemonSpecialty specialty={specialty} dimension="h-4 w-4"/>
      </Flex>
    </Flex>
  );
};
