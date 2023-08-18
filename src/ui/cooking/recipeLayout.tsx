import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {CookingRecipeContent} from '@/ui/cooking/recipeContent';
import {CookingRecipeLayoutProps} from '@/ui/cooking/type';


export const CookingRecipeLayout = (props: React.PropsWithChildren<CookingRecipeLayoutProps>) => {
  const {mealId, clickable, children, markGray} = props;
  const t = useTranslations('Game.Food');

  const mealName = t(mealId.toString());

  return (
    <div className={clsx('button-toggle-inactive-bg relative rounded-lg', clickable && 'button-clickable')}>
      <div className={clsx('absolute left-1.5 top-1.5 z-10 whitespace-nowrap text-sm', markGray && 'text-slate-500')}>
        {mealName}
      </div>
      {children}
      {clickable ?
        <Link href={clickable ? `/meal/${mealId}` : '#'}>
          <CookingRecipeContent mealName={mealName} {...props}/>
        </Link> :
        <CookingRecipeContent mealName={mealName} {...props}/>}
    </div>
  );
};
