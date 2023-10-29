import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {NumberInputOptional} from '@/components/shared/input/number/optional/main';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {Ingredient, IngredientCounter, IngredientMap} from '@/types/game/ingredient';
import {isNotNullish, Nullable} from '@/utils/type';


type Props = {
  ingredientMap: IngredientMap,
  counter: IngredientCounter,
  minCount?: IngredientCounter,
  showIngredient: (ingredient: Ingredient) => boolean,
  onValueChanged: (ingredient: Ingredient, count: Nullable<number>) => void,
};

export const CookingInputIngredientCounter = ({
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

        return (
          <NumberInputOptional
            key={id}
            text={<PokemonIngredientIcon dimension="h-7 w-7" id={id}/>}
            min={(minCount && minCount[id]) ?? 0}
            onClickDefault={1}
            value={counter[id]}
            setValue={(value) => onValueChanged(ingredient, value)}
            className="button-bg gap-1 rounded-lg p-1.5"
          />
        );
      })}
    </Flex>
  );
};
