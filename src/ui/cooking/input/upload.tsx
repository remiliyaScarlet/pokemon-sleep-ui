import React from 'react';

import {UserDataUploadControlRow} from '@/components/shared/userData/upload';
import {defaultCookingPreset} from '@/const/user/cooking';
import {CookingCommonProps} from '@/ui/cooking/type';


export const CookingInputUpload = ({filter, preloaded}: CookingCommonProps) => {
  return (
    <UserDataUploadControlRow
      opts={{
        type: 'cooking',
        data: {
          ...defaultCookingPreset,
          ...preloaded,
          potCapacity: filter.capacity,
          mealType: filter.type,
          ingredientCount: filter.ingredientCount,
          recipeLevel: filter.recipeLevel,
        },
      }}
    />
  );
};
