import React from 'react';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {IngredientIcons} from '@/components/shared/food/ingredientIcons';
import {imageIconSizes} from '@/styles/image';
import {IngredientMap} from '@/types/mongo/ingredient';
import {CookingRecipeLayout} from '@/ui/cooking/recipeLayout';
import {CookingCommonProps} from '@/ui/cooking/type';
import {getMealEnergy} from '@/ui/cooking/utils';
import {getMealRequiredQuantity} from '@/utils/game/meal';
import {classNames} from '@/utils/react';


type Props = Omit<CookingCommonProps, 'setInput'> & {
  ingredients: IngredientMap,
};

export const CookingResult = ({input, meals, ingredients}: Props) => {
  const t = useTranslations('UI.InPage.Cooking');

  const validMeals = React.useMemo(
    () => meals.filter((meal) => {
      if (input.type !== meal.type) {
        return false;
      }

      return getMealRequiredQuantity(meal) <= input.capacity;
    }),
    [input],
  );
  const totalEnergy = React.useMemo(
    () => validMeals.map((meal) => ({
      meal,
      energy: getMealEnergy({
        meal,
        recipeLevel: input.recipeLevel[meal.id] ?? 1,
        ingredients,
      }),
    })),
    [validMeals, input, ingredients],
  );

  return (
    <Flex direction="row" wrap center className="gap-1.5">
      {totalEnergy
        .sort((a, b) => (b.energy ?? 0) - (a.energy ?? 0))
        .map(({meal, energy}) => (
          <div key={meal.id} className={classNames(
            'width-with-gap xs:width-with-gap-2-items',
            'sm:width-with-gap-3-items md:width-with-gap-4-items',
            'lg:width-with-gap-5-items xl:width-with-gap-6-items',
          )}>
            <CookingRecipeLayout mealId={meal.id} imageSizeClass="h-24 w-24">
              <Flex direction="col" className="gap-1">
                <Flex direction="row" className="gap-0.5">
                  <IngredientIcons meal={meal}/>
                </Flex>
                <Flex direction="row" className="items-center gap-1">
                  <div className="relative h-4 w-4">
                    <Image
                      src="/images/generic/energy.png" alt={t('Energy')}
                      fill sizes={imageIconSizes}
                    />
                  </div>
                  <div>
                    {energy}
                  </div>
                </Flex>
              </Flex>
            </CookingRecipeLayout>
          </div>
        ))}
    </Flex>
  );
};
