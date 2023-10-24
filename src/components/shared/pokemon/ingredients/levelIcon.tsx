import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {LevelIcon} from '@/components/shared/icon/lv';
import {IngredientLevelIconCommonProps} from '@/components/shared/pokemon/ingredients/type';


export const PokemonIngredientLevelIcon = ({level, lvAsText}: IngredientLevelIconCommonProps) => {
  return (
    <Flex direction="row" noFullWidth center className={clsx(lvAsText && 'gap-1')}>
      {lvAsText ? <div>Lv</div> : <LevelIcon dimension="h-7 w-7"/>}
      <div>{level}</div>
    </Flex>
  );
};
