'use client';
import React from 'react';

import {Flex} from '@/components/layout/flex';
import {PokemonLevelSlider} from '@/components/shared/pokemon/level/slider';
import {PokemonIngredientProductionMap} from '@/types/game/pokemon';
import {ingredientLevels} from '@/types/game/pokemon/ingredient';
import {MealPokemonOfIngredientLevel} from '@/ui/meal/page/pokemonOfLevel';
import {MealCommonProps, MealPokemonOfIngredientLevelProps} from '@/ui/meal/page/type';


type Props = MealCommonProps & {
  pokemonIngredientProductionMap: PokemonIngredientProductionMap,
};

export const MealPokemonOfIngredient = (props: Props) => {
  const {pokemonIngredientProductionMap, pokemonMaxLevel} = props;
  const [level, setLevel] = React.useState(1);

  return (
    <>
      <Flex direction="col" className="info-section">
        <PokemonLevelSlider level={level} maxLevel={pokemonMaxLevel} setLevel={setLevel}/>
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
