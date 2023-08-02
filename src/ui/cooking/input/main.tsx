import React from 'react';

import {Flex} from '@/components/layout/flex';
import {CookingInputGeneral} from '@/ui/cooking/input/generic';
import {CookingInputRecipe} from '@/ui/cooking/input/recipe';
import {CookingCommonProps} from '@/ui/cooking/type';


export const CookingInputUI = (props: CookingCommonProps) => {
  return (
    <Flex direction="col" center className="gap-1">
      <CookingInputGeneral {...props}/>
      <CookingInputRecipe {...props}/>
    </Flex>
  );
};
