import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {Grid} from '@/components/layout/grid';
import {getAllIngredients} from '@/controller/ingredient';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {IngredientLink} from '@/ui/ingredient/index/link';


export const IngredientIndex = () => {
  const data = React.use(getAllIngredients());

  return (
    <PublicPageLayout>
      <AdsUnit/>
      <Grid center className="grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
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
