import React from 'react';

import {Flex} from '@/components/layout/flex';
import {VerticalSplitter} from '@/components/shared/common/splitter';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {PokemonInfo} from '@/types/mongo/pokemon';


type Props = {
  ingredients: PokemonInfo['ingredients'],
};

export const PokemonIngredientIcons = ({ingredients}: Props) => {
  return (
    <Flex direction="row" noFullWidth className="gap-0.5">
      <PokemonIngredientIcon id={ingredients.fixed ?? null}/>
      {ingredients.random && <VerticalSplitter/>}
      {ingredients.random?.map((id) => <PokemonIngredientIcon key={id} id={id}/>)}
    </Flex>
  );
};
