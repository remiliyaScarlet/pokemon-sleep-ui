import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {VerticalSplitter} from '@/components/shared/common/splitter';
import {PokemonIngredientLevelIcon} from '@/components/shared/pokemon/ingredients/levelIcon';
import {IngredientChain, ingredientLevels} from '@/types/game/pokemon/ingredient';
import {PokemonIngredientIcon} from '@/ui/pokedex/page/production/ingredient/icon';


type Props = {
  chain: IngredientChain,
};

export const PokemonIngredientPossibilities = ({chain}: Props) => {
  return (
    <Flex direction="col" className="justify-center gap-1 p-1.5 lg:flex-row">
      {ingredientLevels.map((ingredientLevel, idx) => {
        const productions = chain.ingredients[ingredientLevel];
        const productionKeys = productions.map(({id}) => id).join('-');

        return (
          <React.Fragment key={productionKeys}>
            {idx > 0 && <VerticalSplitter className="hidden lg:block"/>}
            <Flex direction="row" center noFullWidth className="gap-2 lg:flex-col">
              <PokemonIngredientLevelIcon level={ingredientLevel}/>
              <Flex direction="row" center wrap className="gap-1">
                {productions.map((production) => (
                  <PokemonIngredientIcon
                    key={`${ingredientLevel}-${production.id}-${production.qty}`}
                    production={production}
                  />
                ))}
              </Flex>
            </Flex>
          </React.Fragment>
        );
      })}
    </Flex>
  );
};
