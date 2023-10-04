import React from 'react';

import {clsx} from 'clsx';

import {AdsUnit} from '@/components/ads/main';
import {Grid} from '@/components/layout/grid';
import {getAllIngredients} from '@/controller/ingredient';
import {DefaultPageProps} from '@/types/next/page';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {IngredientLink} from '@/ui/ingredient/index/link';


export const IngredientIndex = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const data = await getAllIngredients();

  return (
    <PublicPageLayout locale={locale}>
      <AdsUnit/>
      <Grid center className={clsx(
        'grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6',
      )}>
        {Object.values(data).map((ingredient) => (
          ingredient ?
            <IngredientLink key={ingredient.id} ingredient={ingredient}/> :
            <></>
        ))}
      </Grid>
      <AdsUnit/>
    </PublicPageLayout>
  );
};
