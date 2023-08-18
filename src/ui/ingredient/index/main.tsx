import React from 'react';

import {clsx} from 'clsx';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex';
import {getAllIngredients} from '@/controller/ingredient';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {IngredientLink} from '@/ui/ingredient/index/link';


export const IngredientIndex = () => {
  const data = React.use(getAllIngredients());

  return (
    <PublicPageLayout>
      <AdsUnit/>
      <Flex direction="row" wrap center className="gap-2 p-3">
        {Object.values(data).map((ingredient) => (
          ingredient ?
            <div
              key={ingredient.id}
              className={clsx(
                'width-with-gap width-with-gap-2-items sm:width-with-gap-3-items relative',
                'md:width-with-gap-5-items lg:width-with-gap-6-items xl:width-with-gap-8-items',
              )}
            >
              <IngredientLink ingredient={ingredient}/>
            </div> :
            <></>
        ))}
      </Flex>
      <AdsUnit/>
    </PublicPageLayout>
  );
};
