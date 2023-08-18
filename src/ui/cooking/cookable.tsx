import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {IngredientIcons} from '@/components/shared/food/ingredientIcons';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {CookingRecipeLayout} from '@/ui/cooking/recipeLayout';
import {CookingFilterIngredientCount, MealEnergyData} from '@/ui/cooking/type';
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
    <div key={meal.id} className={clsx(
      'width-with-gap xs:width-with-gap-2-items group',
      'sm:width-with-gap-3-items md:width-with-gap-4-items',
      'lg:width-with-gap-5-items xl:width-with-gap-6-items',
    )}>
      <CookingRecipeLayout
        mealId={meal.id} imageDimension="h-24 w-24" clickable
        markGray={Object.values(isIngredientEnough).some((value) => value)}
      >
        <Flex noFullWidth direction="col" className="absolute bottom-1 left-1 z-10 gap-1">
          <Flex direction="row" className="gap-0.5">
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
    </div>
  );
};
