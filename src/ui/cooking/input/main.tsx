import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {CookingInputControl} from '@/ui/cooking/input/control';
import {CookingInputGeneral} from '@/ui/cooking/input/generic';
import {CookingInputIngredientCount} from '@/ui/cooking/input/ingredientCount';
import {CookingCommonProps} from '@/ui/cooking/type';


export const CookingInputUI = (props: CookingCommonProps) => {
  return (
    <Flex center className="gap-1">
      <CookingInputGeneral {...props}/>
      <CookingInputIngredientCount {...props}/>
      <CookingInputControl {...props}/>
    </Flex>
  );
};
