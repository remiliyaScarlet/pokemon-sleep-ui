import React from 'react';

import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {CookingRecipeContent} from '@/ui/cooking/recipeContent';
import {CookingRecipeLayoutProps} from '@/ui/cooking/type';
import {classNames} from '@/utils/react';


export const CookingRecipeLayout = (props: React.PropsWithChildren<CookingRecipeLayoutProps>) => {
  const t = useTranslations('Game.Food');
  const {mealId, clickable, children} = props;

  const mealName = t(mealId.toString());

  return (
    <div className={classNames(
      'relative button-toggle-inactive-bg rounded-lg',
      clickable ? 'button-clickable' : undefined,
    )}>
      <div className="absolute left-1.5 top-1.5 z-10 whitespace-nowrap text-sm">
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
