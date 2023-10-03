import React from 'react';

import {InputBox} from '@/components/input/box';
import {isFilterConditionActive} from '@/components/input/filter/utils/check';
import {Flex} from '@/components/layout/flex/common';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {CookingCommonProps} from '@/ui/cooking/type';


export const CookingInputIngredientCount = ({filter, setFilter, ingredientMap}: CookingCommonProps) => {
  return (
    <Flex direction="row" wrap center className="gap-1">
      {Object.values(ingredientMap).map((ingredient, idx) => {
        if (
          !ingredient ||
          isFilterConditionActive({filter, filterKey: 'ingredient'}) &&
          !filter.ingredient[ingredient.id]
        ) {
          return <React.Fragment key={`Hidden-${idx}`}/>;
        }

        const id = ingredient.id;

        return (
          <Flex direction="row" noFullWidth key={id} className="button-bg gap-1 rounded-lg p-1.5">
            <PokemonIngredientIcon dimension="h-7 w-7" id={id}/>
            <InputBox
              id={`Ingredient-${id}`}
              type="number"
              value={filter.ingredientCount[id] ?? ''}
              className="w-20 text-center"
              onChange={({target}) => {
                const value = parseInt(target.value);

                setFilter((original) => ({
                  ...original,
                  ingredientCount: {
                    ...original.ingredientCount,
                    [id]: isNaN(value) ? null : value,
                  },
                }));
              }}
            />
          </Flex>
        );
      })}
    </Flex>
  );
};
