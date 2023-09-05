import React from 'react';

import {useTranslations} from 'next-intl';

import {InfoIcon} from '@/components/icons/info';
import {Flex} from '@/components/layout/flex';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {IngredientIcons} from '@/components/shared/meal/ingredients/icons';
import {CookingRecipeLayout} from '@/ui/cooking/recipeLayout';
import {CookingFilterIngredientCount, MealEnergyData} from '@/ui/cooking/type';
import {toSum} from '@/utils/array';
import {formatInt} from '@/utils/number';


type Props = MealEnergyData & {
  ingredientCount: CookingFilterIngredientCount,
};

export const CookingCookable = ({meal, energyInfo, ingredientCount}: Props) => {
  const t = useTranslations('UI.InPage.Cooking');

  const isIngredientEnough = Object.fromEntries(meal.ingredients.map(({id, quantity}) => {
    const filterIngredientCount = ingredientCount[id];

    if (filterIngredientCount == null) {
      return [id, false];
    }

    return [id, quantity > filterIngredientCount];
  }));

  return (
    <CookingRecipeLayout
      mealId={meal.id} imageDimension="h-24 w-24" clickable
      markGray={Object.values(isIngredientEnough).some((value) => value)}
    >
      <Flex noFullWidth direction="col" className="absolute bottom-1 left-1 z-10 gap-1">
        <Flex direction="row" className="items-center gap-0.5">
          <InfoIcon>
            {toSum(meal.ingredients.map(({quantity}) => quantity))}
          </InfoIcon>
          <IngredientIcons
            meal={meal} useTextShadow={false}
            markRed={(ingredient) => isIngredientEnough[ingredient.id]}
          />
        </Flex>
        <Flex direction="row" className="items-center gap-1">
          <ColoredEnergyIcon dimension="h-4 w-4" alt={t('Energy')}/>
          <div>
            {formatInt(energyInfo.atLevel.energy)}
          </div>
        </Flex>
      </Flex>
      <div className="absolute bottom-1 right-1 z-10 text-sm">
        +{formatInt(energyInfo.diffVal)} / +{energyInfo.diffPct.toFixed(0)}%
      </div>
    </CookingRecipeLayout>
  );
};
