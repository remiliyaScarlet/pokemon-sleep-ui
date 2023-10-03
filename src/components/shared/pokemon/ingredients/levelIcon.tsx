import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {IngredientLevelIconCommonProps} from '@/components/shared/pokemon/ingredients/type';
import {imageIconSizes} from '@/styles/image';


export const PokemonIngredientLevelIcon = ({level, lvAsText}: IngredientLevelIconCommonProps) => {
  return (
    <Flex direction="row" noFullWidth center className={clsx(lvAsText && 'gap-1')}>
      {
        lvAsText ?
          <div>Lv</div> :
          <div className="relative h-7 w-7 shrink-0">
            <NextImage src="/images/generic/lv.png" alt="Lv" sizes={imageIconSizes} className="invert-on-light"/>
          </div>
      }
      <div>{level}</div>
    </Flex>
  );
};
