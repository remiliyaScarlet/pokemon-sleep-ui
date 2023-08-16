import React from 'react';

import {Flex} from '@/components/layout/flex';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {PokemonSleepType} from '@/components/shared/pokemon/sleepType/main';
import {PokemonSpecialty} from '@/components/shared/pokemon/specialty/main';
import {PokeboxPokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {isNotNullish} from '@/utils/type';


export const PokeboxPokeInBoxInfo = ({pokemon, pokeInBox}: PokeboxPokeInBoxCommonProps) => {
  const {randomIngredient} = pokeInBox;
  const {sleepType, specialty, berry, ingredients} = pokemon;

  return (
    <Flex direction="row" className="items-center gap-2">
      <Flex direction="col" noFullWidth className="items-center gap-1">
        <Flex direction="row" noFullWidth className="items-center gap-1">
          <PokemonBerryIcon id={berry.id}/>
          <div>{berry.quantity}</div>
        </Flex>
        <PokemonIngredientIcons
          ingredients={{
            fixed: ingredients.fixed,
            random: Object.values(randomIngredient)
              .map((ingredient) => ingredient?.id)
              .filter(isNotNullish),
          }}
        />
      </Flex>
      <Flex direction="col" className="gap-1.5">
        <PokemonSleepType sleepType={sleepType} dimension="h-4 w-4"/>
        <PokemonSpecialty specialty={specialty} dimension="h-4 w-4"/>
      </Flex>
    </Flex>
  );
};
