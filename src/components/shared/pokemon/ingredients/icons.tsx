import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {VerticalSplitter} from '@/components/shared/common/splitter';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {IngredientIconCommonProps} from '@/components/shared/pokemon/ingredients/type';
import {IngredientProduction} from '@/types/game/pokemon/ingredient';
import {NumberFormat} from '@/types/number';
import {formatNumber} from '@/utils/number';


type Props = IngredientIconCommonProps & {
  ingredients: IngredientProduction[][],
  numberFormat?: NumberFormat,
};

export const PokemonIngredientIcons = ({ingredients, numberFormat = 'int', ...props}: Props) => {
  return (
    <Flex direction="row" noFullWidth className="gap-0.5">
      {ingredients.map((data, idx) => (
        <React.Fragment key={data.map(({id, qty}) => `${id}x${qty}`).join('-')}>
          {idx !== 0 && <VerticalSplitter/>}
          {data.map(({id, qty}) => (
            <Flex key={`${id}x${qty}`} direction="row" center noFullWidth className="gap-1">
              <PokemonIngredientIcon id={id} {...props}/>
              <div>{formatNumber({format: numberFormat, num: qty})}</div>
            </Flex>
          ))}
        </React.Fragment>
      ))}
    </Flex>
  );
};
