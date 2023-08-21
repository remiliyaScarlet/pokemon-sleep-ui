import React from 'react';

import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {CookingRecipeContent} from '@/ui/cooking/recipeContent';
import {CookingRecipeLayoutProps} from '@/ui/cooking/type';


export const CookingRecipeLayout = (props: React.PropsWithChildren<CookingRecipeLayoutProps>) => {
  const {mealId, clickable, children} = props;
  const t = useTranslations('Game.Food');

  const mealName = t(mealId.toString());

  if (!clickable) {
    return <CookingRecipeContent mealName={mealName} {...props}>{children}</CookingRecipeContent>;
  }

  return (
    <Link href={`/meal/${mealId}`}>
      <CookingRecipeContent mealName={mealName} {...props}>{children}</CookingRecipeContent>
    </Link>
  );
};
