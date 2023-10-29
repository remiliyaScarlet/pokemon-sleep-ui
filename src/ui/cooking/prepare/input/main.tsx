import React from 'react';

import {MealPreparerControl} from '@/ui/cooking/prepare/input/control';
import {MealPreparerInventory} from '@/ui/cooking/prepare/input/inventory';
import {MealPreparerCommonProps} from '@/ui/cooking/prepare/type';


export const MealPreparerInput = (props: MealPreparerCommonProps) => {
  return (
    <>
      <MealPreparerInventory {...props}/>
      <MealPreparerControl {...props}/>
    </>
  );
};
