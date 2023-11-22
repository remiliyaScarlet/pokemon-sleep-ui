import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {Flex} from '@/components/layout/flex/common';
import {MealIngredientSection} from '@/ui/meal/page/ingredient';
import {MealIngredientSectionProps} from '@/ui/meal/page/type';


export const MealPokemonOfIngredientLevel = (props: Omit<MealIngredientSectionProps, 'ingredient'>) => {
  const {meal} = props;

  return (
    <AnimatedCollapse appear show>
      <Flex center className="info-section">
        {meal.ingredients.map((ingredient) => (
          <MealIngredientSection key={ingredient.id} ingredient={ingredient} {...props}/>
        ))}
        <AdsUnit/>
      </Flex>
    </AnimatedCollapse>
  );
};
