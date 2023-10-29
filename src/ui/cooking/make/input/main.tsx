import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {MealMakerInputControl} from '@/ui/cooking/make/input/control';
import {MealMakerInputGeneral} from '@/ui/cooking/make/input/generic';
import {MealMakerInputInventory} from '@/ui/cooking/make/input/inventory';
import {MealMakerCommonProps} from '@/ui/cooking/make/type';


export const MealMakerInputUI = (props: MealMakerCommonProps) => {
  return (
    <Flex center className="gap-1">
      <MealMakerInputGeneral {...props}/>
      <MealMakerInputInventory {...props}/>
      <MealMakerInputControl {...props}/>
    </Flex>
  );
};
