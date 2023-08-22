import React from 'react';

import {Flex} from '@/components/layout/flex';
import {VerticalSplitter} from '@/components/shared/common/splitter';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {PokemonInfo} from '@/types/game/pokemon';
import {Dimension} from '@/types/style';


type Props = {
  ingredients: PokemonInfo['ingredients'],
  dimension?: Dimension,
};

export const PokemonIngredientIcons = ({ingredients, dimension}: Props) => {
  return (
    <Flex direction="row" noFullWidth className="gap-0.5">
      <PokemonIngredientIcon id={ingredients.fixed ?? null} dimension={dimension}/>
      {ingredients.random && <VerticalSplitter/>}
      {ingredients.random?.map((id, idx) => (
        <PokemonIngredientIcon key={idx} dimension={dimension} id={id}/>
      ))}
    </Flex>
  );
};
