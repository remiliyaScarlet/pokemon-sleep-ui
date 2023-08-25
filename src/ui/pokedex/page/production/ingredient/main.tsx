import React from 'react';

import {Flex} from '@/components/layout/flex';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonIngredientCombination} from '@/ui/pokedex/page/production/ingredient/combination';
import {PokemonIngredientPossibilities} from '@/ui/pokedex/page/production/ingredient/possibility';
import {PokemonProps} from '@/ui/pokedex/page/type';


type Props = PokemonProps & {
  level: number,
};

export const PokemonIngredientProduction = ({level, ...props}: Props) => {
  const {pokemon, ingredientChainMap} = props;
  const {ingredientChain} = pokemon;

  const chain = ingredientChainMap[ingredientChain];

  return (
    <Flex direction="col" className="gap-3">
      <PokemonIngredientPossibilities chain={chain}/>
      <HorizontalSplitter/>
      <PokemonIngredientCombination level={level} chain={chain} {...props}/>
    </Flex>
  );
};
