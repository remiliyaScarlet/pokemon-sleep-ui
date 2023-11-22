import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PokemonLevelSlider} from '@/components/shared/pokemon/level/slider';
import {ingredientLevels} from '@/types/game/pokemon/ingredient';
import {MealPokemonOfIngredientLevel} from '@/ui/meal/page/pokemonOfLevel';
import {MealCommonProps} from '@/ui/meal/page/type';
import {getIngredientLevel} from '@/utils/game/ingredient';


export const MealPokemonOfIngredient = (props: MealCommonProps) => {
  const {pokemonIngredientProductionMap, pokemonMaxLevel} = props;
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
      <MealPokemonOfIngredientLevel
        pokemonLevel={level}
        ingredientProductionMapOfLevel={pokemonIngredientProductionMap[ingredientLevel]}
        {...props}
      />
    </>
  );
};
