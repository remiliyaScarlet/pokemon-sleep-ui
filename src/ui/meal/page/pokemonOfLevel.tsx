import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {MealIngredientSection} from '@/ui/meal/page/ingredient';
import {MealIngredientSectionProps} from '@/ui/meal/page/type';


export const MealPokemonOfIngredientLevel = (props: Omit<MealIngredientSectionProps, 'ingredient'>) => {
  const {meal} = props;

  return (
    <AnimatedCollapse appear show className="flex flex-col gap-1.5">
      {meal.ingredients.map((ingredient) => (
        <MealIngredientSection key={ingredient.id} ingredient={ingredient} {...props}/>
      ))}
      <AdsUnit/>
    </AnimatedCollapse>
  );
};
