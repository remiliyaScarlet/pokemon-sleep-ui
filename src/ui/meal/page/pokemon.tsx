import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PokemonLevelSlider} from '@/components/shared/pokemon/level/slider';
import {ingredientLevels} from '@/types/game/pokemon/ingredient';
import {MealPokemonOfIngredientLevel} from '@/ui/meal/page/pokemonOfLevel';
import {MealCommonProps, MealPokemonOfIngredientLevelProps} from '@/ui/meal/page/type';


export const MealPokemonOfIngredient = (props: MealCommonProps) => {
  const {pokemonIngredientProductionMap, pokemonMaxLevel} = props;
  const [level, setLevel] = React.useState(1);

  return (
    <>
      <Flex className="info-section">
        <PokemonLevelSlider value={level} max={pokemonMaxLevel} setValue={setLevel}/>
      </Flex>
      {ingredientLevels
        .map((ingredientLevel): MealPokemonOfIngredientLevelProps => ({
          ingredientLevel,
          pokemonIngredientProductionOfLevel: pokemonIngredientProductionMap[ingredientLevel],
          show: level >= ingredientLevel,
        }))
        .sort((a, b) => b.ingredientLevel - a.ingredientLevel)
        .map((pokemonOfIngredientLevel) => (
          <MealPokemonOfIngredientLevel
            key={pokemonOfIngredientLevel.ingredientLevel}
            pokemonLevel={level}
            pokemonOfIngredientLevel={pokemonOfIngredientLevel}
            {...props}
          />
        ))}
    </>
  );
};
