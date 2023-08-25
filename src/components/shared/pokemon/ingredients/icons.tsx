import React from 'react';

import {Flex} from '@/components/layout/flex';
import {VerticalSplitter} from '@/components/shared/common/splitter';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {IngredientProduction} from '@/types/game/pokemon/ingredient';
import {Dimension} from '@/types/style';


type Props = {
  ingredients: IngredientProduction[][],
  dimension?: Dimension,
};

export const PokemonIngredientIcons = ({ingredients, dimension}: Props) => {
  return (
    <Flex direction="row" noFullWidth className="gap-0.5">
      {ingredients.map((data, idx) => (
        <React.Fragment key={data.map(({id, qty}) => `${id}x${qty}`).join('-')}>
          {idx !== 0 && <VerticalSplitter/>}
          {data.map(({id, qty}) => (
            <Flex key={`${id}x${qty}`} direction="row" center noFullWidth className="gap-1">
              <PokemonIngredientIcon dimension={dimension} id={id}/>
              <div>{qty}</div>
            </Flex>
          ))}
        </React.Fragment>
      ))}
    </Flex>
  );
};
