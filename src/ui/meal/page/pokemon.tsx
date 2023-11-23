import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {PokemonLevelSlider} from '@/components/shared/pokemon/level/slider';
import {ingredientLevels} from '@/types/game/pokemon/ingredient';
import {MealIngredientSection} from '@/ui/meal/page/ingredient';
import {MealCommonProps} from '@/ui/meal/page/type';
import {getIngredientLevel} from '@/utils/game/ingredient';


export const MealPokemonOfIngredient = (props: MealCommonProps) => {
  const {meal, pokemonIngredientProductionMap, pokemonMaxLevel} = props;
  const [level, setLevel] = React.useState(1);
  const ingredientLevel = React.useMemo(() => getIngredientLevel(level), [level]);

  return (
    <>
      <Flex className="info-section">
        <PokemonLevelSlider
          value={level}
          max={pokemonMaxLevel}
          setValue={setLevel}
          presetLevels={[...ingredientLevels]}
        />
      </Flex>
      <Flex className="gap-1.5">
        {meal.ingredients.map((ingredient) => (
          <MealIngredientSection
            key={ingredient.id}
            ingredient={ingredient}
            pokemonLevel={level}
            ingredientProductionMapOfLevel={pokemonIngredientProductionMap[ingredientLevel]}
            {...props}
          />
        ))}
        <AdsUnit/>
      </Flex>
    </>
  );
};
