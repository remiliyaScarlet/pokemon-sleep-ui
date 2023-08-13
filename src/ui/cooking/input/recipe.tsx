import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex';
import {CookingInputRecipeSingle} from '@/ui/cooking/input/recipeSingle';
import {CookingCommonProps} from '@/ui/cooking/type';


export const CookingInputRecipe = (props: CookingCommonProps) => {
  const {meals, filter} = props;

  return (
    <Flex direction="row" center wrap className="gap-1">
      {meals
        .filter(({type}) => filter.type === type)
        .map((data) => (
          <div key={data.id} className={clsx(
            'width-with-gap-xs xs:width-with-gap-2-items',
            'sm:width-with-gap-3-items md:width-with-gap-4-items',
            'lg:width-with-gap-5-items xl:width-with-gap-6-items',
          )}>
            <CookingInputRecipeSingle {...props} data={data}/>
          </div>
        ))}
    </Flex>
  );
};
