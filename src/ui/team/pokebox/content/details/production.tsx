import React from 'react';

import {Flex} from '@/components/layout/flex';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {PokeboxPokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {isNotNullish} from '@/utils/type';


export const PokeboxPokeInBoxProducing = ({pokemon, pokeInBox}: PokeboxPokeInBoxCommonProps) => {
  const {berry, ingredients} = pokemon;
  const {randomIngredient} = pokeInBox;

  return (
    <Flex direction="col" className="gap-1.5">
      <Flex direction="row" noFullWidth className="gap-1.5">
        <PokemonBerryIcon id={berry.id} dimension="h-6 w-6"/>
        <div>{berry.quantity}</div>
      </Flex>
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
  );
};
