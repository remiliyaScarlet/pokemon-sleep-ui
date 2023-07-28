import React from 'react';

import {Flex} from '@/components/layout/flex';
import {getAllIngredients} from '@/controller/ingredient';
import {PageLayout} from '@/ui/base/layout';
import {IngredientLink} from '@/ui/ingredient/index/link';
import {classNames} from '@/utils/react';


export const IngredientIndex = () => {
  const data = React.use(getAllIngredients());

  return (
    <PageLayout>
      <Flex direction="row" wrap center className="gap-2 p-3">
        {Object.values(data).map((ingredient) => (
          <div
            key={ingredient.id}
            className={classNames(
              'relative width-with-gap width-with-gap-3-items sm:width-with-gap-4-items',
              'md:width-with-gap-6-items lg:width-with-gap-8-items xl:width-with-gap-12-items',
            )}
          >
            <IngredientLink ingredient={ingredient}/>
          </div>
        ))}
      </Flex>
    </PageLayout>
  );
};
