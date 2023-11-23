import React from 'react';

import {CollapsibleFull} from '@/components/layout/collapsible/full';
import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Flex} from '@/components/layout/flex/common';
import {PokemonIngredientStats} from '@/components/shared/pokemon/icon/itemStats/ingredient';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {MealIngredientSectionProps} from '@/ui/meal/page/type';


export const MealIngredientSection = ({
  meal,
  preloadedSettings,
  calculatedSettings,
  ingredient,
  pokemonLevel,
  ingredientProductionMapOfLevel,
  ...props
}: MealIngredientSectionProps) => {
  const {ingredientMap} = props;
  const {id, quantity} = ingredient;

  const collapsible = useCollapsible();

  return (
    <CollapsibleFull state={collapsible} button={
      <Flex center direction="row" className="gap-1 text-xl">
        <PokemonIngredientIcon id={id} dimension="h-8 w-8" noLink/>
        <div>{quantity}</div>
      </Flex>
    }>
      <PokemonIngredientStats
        level={pokemonLevel}
        ingredient={ingredientMap[id]}
        pokemonIngredientProduction={ingredientProductionMapOfLevel[id] ?? []}
        hidePokebox
        {...calculatedSettings}
        {...props}
      />
    </CollapsibleFull>
  );
};
