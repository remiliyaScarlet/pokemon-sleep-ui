import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {Flex} from '@/components/layout/flex/common';
import {PokemonIngredientLevelIcon} from '@/components/shared/pokemon/ingredients/levelIcon';
import {MealIngredientSection} from '@/ui/meal/page/ingredient';
import {MealIngredientSectionProps} from '@/ui/meal/page/type';


export const MealPokemonOfIngredientLevel = (props: Omit<MealIngredientSectionProps, 'ingredient'>) => {
  const {
    meal,
    pokemonOfIngredientLevel,
  } = props;
  const {
    ingredientLevel,
    show,
  } = pokemonOfIngredientLevel;

  return (
    <AnimatedCollapse show={show}>
      <Flex center className="info-section">
        <div className="h-8 w-8">
          <PokemonIngredientLevelIcon level={ingredientLevel}/>
        </div>
        {meal.ingredients.map((ingredient) => (
          <MealIngredientSection ingredient={ingredient} {...props}/>
        ))}
        <AdsUnit/>
      </Flex>
    </AnimatedCollapse>
  );
};
