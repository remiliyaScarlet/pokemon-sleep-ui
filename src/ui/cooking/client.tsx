'use client';
import React from 'react';

import {Flex} from '@/components/layout/flex';
import {IngredientMap} from '@/types/mongo/ingredient';
import {Meal} from '@/types/mongo/meal';
import {CookingInputUI} from '@/ui/cooking/input/main';
import {CookingResult} from '@/ui/cooking/result';
import {CookingInput} from '@/ui/cooking/type';
import {toUnique} from '@/utils/array';
import {getMealRequiredQuantity} from '@/utils/game/meal';


type Props = {
  meals: Meal[],
  ingredients: IngredientMap,
};

export const CookingClient = ({meals, ingredients}: Props) => {
  const [input, setInput] = React.useState<CookingInput>({
    type: 1,
    capacity: 15,
    recipeLevel: {},
  });

  const validMeals = React.useMemo(
    () => meals.filter((meal) => {
      if (input.type !== meal.type) {
        return false;
      }

      return getMealRequiredQuantity(meal) <= input.capacity;
    }),
    [input],
  );
  const mealTypes = toUnique(meals.map(({type}) => type));

  return (
    <Flex direction="col">
      <CookingInputUI input={input} setInput={setInput} meals={validMeals} mealTypes={mealTypes}/>
      <hr className="my-2 border-t-gray-700"/>
      <CookingResult input={input} meals={validMeals} mealTypes={mealTypes} ingredients={ingredients}/>
    </Flex>
  );
};
