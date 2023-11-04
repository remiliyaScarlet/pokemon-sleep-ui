import React from 'react';

import {InputRow} from '@/components/input/filter/row';
import {UserDataUploadButton} from '@/components/shared/userData/upload';
import {toCookingPreset} from '@/ui/cooking/prepare/input/utils';
import {MealPreparerCommonProps} from '@/ui/cooking/prepare/type';


export const MealPreparerControl = ({filter, preloaded}: MealPreparerCommonProps) => {
  return (
    <InputRow className="justify-end">
      <UserDataUploadButton opts={{
        type: 'cooking',
        data: toCookingPreset({preloaded, filter}),
      }}/>
    </InputRow>
  );
};
