import React from 'react';

import Link from 'next/link';

import {CookingRecipeContent} from '@/ui/cooking/recipeContent';
import {CookingRecipeLayoutProps} from '@/ui/cooking/type';


export const CookingRecipeLayout = (props: React.PropsWithChildren<CookingRecipeLayoutProps>) => {
  const {mealId, clickable} = props;

  if (clickable) {
    return (
      <Link href={clickable ? `/meal/${mealId}` : '#'}>
        <CookingRecipeContent {...props}/>
      </Link>
    );
  }

  return <CookingRecipeContent {...props}/>;
};
