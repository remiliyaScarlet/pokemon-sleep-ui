import React from 'react';

import {UserDataUploadControlRow} from '@/components/shared/control/upload';
import {CookingCommonProps} from '@/ui/cooking/type';


export const CookingInputUpload = ({filter}: CookingCommonProps) => {
  return (
    <UserDataUploadControlRow
      opts={{type: 'recipeLevel', data: {level: filter.recipeLevel, potCapacity: filter.capacity}}}
    />
  );
};
