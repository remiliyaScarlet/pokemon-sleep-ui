import React from 'react';

import {InfoIcon} from '@/components/icons/info';
import {Flex} from '@/components/layout/flex/common';
import {IngredientIcons} from '@/components/shared/meal/ingredients/icons';
import {IngredientIconsFromMeal} from '@/components/shared/meal/ingredients/iconsFromMeal';
import {CookingRecipePartsProps} from '@/ui/cooking/recipe/parts/type';
import {getMealIngredientCount} from '@/utils/game/meal/count';


export const CookingRecipeIngredients = ({
  meal,
  ingredientsMissing,
  ingredientSetReady,
}: CookingRecipePartsProps) => {
  return (
    <Flex direction="row" className="h-9 items-end gap-0.5">
      <InfoIcon>
        {getMealIngredientCount(meal)}
      </InfoIcon>
      <Flex noFullWidth>
        <IngredientIcons ingredients={ingredientsMissing} markRed={() => true} useTextShadow={false}/>
        <IngredientIconsFromMeal
          meal={meal} useTextShadow={false}
          markRed={(ingredient) => ingredientSetReady[ingredient.id] < 1}
        />
      </Flex>
    </Flex>
  );
};
