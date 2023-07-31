import React from 'react';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {IngredientIcons} from '@/components/shared/food/ingredientIcons';
import {imageIconSizes} from '@/styles/image';
import {CookingRecipeLayout} from '@/ui/cooking/recipeLayout';
import {CookingCommonProps} from '@/ui/cooking/type';
import {getMealEnergyInfo} from '@/utils/game/meal';
import {classNames} from '@/utils/react';


type Props = Omit<CookingCommonProps, 'setFilter'>;

export const CookingResult = ({filter, meals, ingredients}: Props) => {
  const t = useTranslations('UI.InPage.Cooking');

  const mealEnergyInfo = React.useMemo(
    () => meals.map((meal) => ({
      meal,
      energyInfo: getMealEnergyInfo({
        meal,
        ingredients,
        level: filter.recipeLevel[meal.id] ?? 1,
      }),
    })),
    [meals, ingredients, filter],
  );

  return (
    <Flex direction="row" wrap center className="gap-1.5">
      {mealEnergyInfo
        .sort((a, b) => (b.energyInfo.atLevel.energy ?? 0) - (a.energyInfo.atLevel.energy ?? 0))
        .map(({meal, energyInfo}) => (
          <div key={meal.id} className={classNames(
            'width-with-gap xs:width-with-gap-2-items',
            'sm:width-with-gap-3-items md:width-with-gap-4-items',
            'lg:width-with-gap-5-items xl:width-with-gap-6-items',
          )}>
            <CookingRecipeLayout mealId={meal.id} imageSizeClass="h-24 w-24" clickable>
              <Flex direction="col" className="gap-1">
                <Flex direction="row" className="gap-0.5">
                  <IngredientIcons meal={meal} useTextShadow={false}/>
                </Flex>
                <Flex direction="row" className="items-center gap-1">
                  <div className="relative h-4 w-4">
                    <Image src="/images/generic/energy.png" alt={t('Energy')} fill sizes={imageIconSizes}/>
                  </div>
                  <div>
                    {energyInfo.atLevel.energy}
                  </div>
                  <div className="ml-auto self-end text-sm">
                    +{energyInfo.diffVal} / +{energyInfo.diffPct.toFixed(0)}%
                  </div>
                </Flex>
              </Flex>
            </CookingRecipeLayout>
          </div>
        ))}
    </Flex>
  );
};
