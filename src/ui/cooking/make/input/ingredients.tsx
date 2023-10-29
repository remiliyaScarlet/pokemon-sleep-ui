import React from 'react';

import {clsx} from 'clsx';

import {InputBox} from '@/components/input/box';
import {Flex} from '@/components/layout/flex/common';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {dangerText} from '@/styles/classes';
import {Ingredient, IngredientCounter, IngredientMap} from '@/types/game/ingredient';
import {isNotNullish} from '@/utils/type';


type Props = {
  ingredientMap: IngredientMap,
  counter: IngredientCounter,
  minCount?: IngredientCounter,
  showIngredient: (ingredient: Ingredient) => boolean,
  onValueChanged: (ingredient: Ingredient, count: number | null) => void,
};

export const MealMakerInputIngredients = ({
  ingredientMap,
  counter,
  minCount,
  showIngredient,
  onValueChanged,
}: Props) => {
  return (
    <Flex direction="row" wrap center noFullWidth className="gap-1">
      {Object.values(ingredientMap).filter(isNotNullish).map((ingredient) => {
        if (!showIngredient(ingredient)) {
          return null;
        }

        const id = ingredient.id;
        const count = counter[id];
        const min = (minCount && minCount[id]) ?? 0;

        return (
          <Flex direction="row" noFullWidth key={id} className="button-bg gap-1 rounded-lg p-1.5">
            <PokemonIngredientIcon dimension="h-7 w-7" id={id}/>
            <InputBox
              id={`Ingredient-${id}`}
              type="number"
              value={count ?? ''}
              className={clsx('w-20 text-center', count != null && count < min && dangerText)}
              min={0}
              onChange={({target}) => {
                const value = parseInt(target.value);

                onValueChanged(ingredient, isNaN(value) ? null : Math.max(0, value));
              }}
            />
          </Flex>
        );
      })}
    </Flex>
  );
};
