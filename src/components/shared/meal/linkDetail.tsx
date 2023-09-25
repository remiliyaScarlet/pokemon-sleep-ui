import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {IngredientIconsFromMeal} from '@/components/shared/meal/ingredients/iconsFromMeal';
import {MealLinkProps} from '@/components/shared/meal/type';
import {getMealRequiredQuantity} from '@/utils/game/meal';
import {formatInt} from '@/utils/number';


export const MealLinkDetail = (props: MealLinkProps) => {
  const {meal, mealLevel, showEnergy} = props;

  const t = useTranslations('UI.InPage.Cooking');

  const energyAtLevel = meal.levels.find(({lv}) => lv === mealLevel);

  return (
    <Flex direction="row" className="items-end gap-0.5 text-xs">
      <Flex direction="col" noFullWidth center className="info-icon-normal text-shadow-preset h-6 w-6">
        {getMealRequiredQuantity(meal)}
      </Flex>
      <Flex direction="col" noFullWidth className="gap-0.5">
        {
          showEnergy &&
          <Flex direction="row" noFullWidth className="items-end gap-0.5">
            <ColoredEnergyIcon dimension="h-4 w-4" alt={t('Energy')}/>
            <div>
              {formatInt(energyAtLevel?.energy)}
            </div>
            <div>@</div>
            <div>Lv.{mealLevel}</div>
          </Flex>
        }
        <IngredientIconsFromMeal meal={meal}/>
      </Flex>
    </Flex>
  );
};
