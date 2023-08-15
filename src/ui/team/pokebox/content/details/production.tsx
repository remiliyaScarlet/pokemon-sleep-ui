import React from 'react';

import {Flex} from '@/components/layout/flex';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {PokemonSleepTypeIcon} from '@/components/shared/pokemon/sleepType/icon';
import {PokemonSpecialtyIcon} from '@/components/shared/pokemon/specialty/icon';
import {PokeboxPokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {isNotNullish} from '@/utils/type';


export const PokeboxPokeInBoxProducing = ({pokemon, pokeInBox}: PokeboxPokeInBoxCommonProps) => {
  const {sleepType, specialty, berry, ingredients} = pokemon;
  const {randomIngredient} = pokeInBox;

  return (
    <Flex direction="row" center className="mt-auto">
      <Flex direction="row" center noFullWidth className="gap-1.5">
        <PokemonSleepTypeIcon sleepType={sleepType}/>
        <PokemonSpecialtyIcon specialty={specialty}/>
        <PokemonBerryIcon id={berry.id} dimension="h-6 w-6"/>
        <div>{berry.quantity}</div>
      </Flex>
      <Flex direction="col" noFullWidth className="ml-auto">
        <PokemonIngredientIcons
          ingredients={{
            fixed: ingredients.fixed,
            random: Object.values(randomIngredient)
              .map((ingredient) => ingredient?.id)
              .filter(isNotNullish),
          }}
          dimension="h-6 w-6"
        />
      </Flex>
    </Flex>
  );
};
