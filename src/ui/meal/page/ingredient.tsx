import React from 'react';

import {clsx} from 'clsx';

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
  pokemonOfIngredientLevel,
  ...props
}: MealIngredientSectionProps) => {
  const {ingredientMap} = props;
  const {id, quantity} = ingredient;
  const {pokemonIngredientProductionOfLevel} = pokemonOfIngredientLevel;

  const collapsible = useCollapsible();

  return (
    <CollapsibleFull state={collapsible} button={
      <Flex center direction="row" className="gap-1 text-xl">
        <PokemonIngredientIcon id={id} dimension="h-8 w-8" noLink/>
        <div>{quantity}</div>
      </Flex>
    }>
      <Flex center className={clsx(
        'border-common rounded-r-lg border-y-2 border-r-2 py-2 pr-2',
      )}>
        <PokemonIngredientStats
          level={pokemonLevel}
          ingredient={ingredientMap[id]}
          pokemonIngredientProduction={pokemonIngredientProductionOfLevel[id] ?? []}
          {...calculatedSettings}
          {...props}
        />
      </Flex>
    </CollapsibleFull>
  );
};
