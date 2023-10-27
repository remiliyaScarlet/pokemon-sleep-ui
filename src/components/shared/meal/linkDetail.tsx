import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {IngredientIconsFromMeal} from '@/components/shared/meal/ingredients/iconsFromMeal';
import {MealLinkProps} from '@/components/shared/meal/type';
import {getMealIngredientCount} from '@/utils/game/meal/count';
import {getMealFinalStrength} from '@/utils/game/meal/main';
import {formatInt} from '@/utils/number';


export const MealLinkDetail = (props: MealLinkProps) => {
  const {level, meal, showEnergy} = props;

  const t = useTranslations('UI.InPage.Cooking');

  const {base, withMapBonus} = getMealFinalStrength({
    ...props,
    filler: [],
  });

  return (
    <Flex direction="row" className="items-end gap-0.5 text-xs">
      <Flex noFullWidth center className="info-icon-normal text-shadow-preset h-6 w-6">
        {getMealIngredientCount(meal)}
      </Flex>
      <Flex noFullWidth className="gap-0.5">
        {
          showEnergy &&
          <Flex direction="row" noFullWidth className="items-end gap-0.5 whitespace-nowrap">
            <ColoredEnergyIcon dimension="h-4 w-4" alt={t('Energy')}/>
            <div>
              {`${formatInt(base)} (${formatInt(withMapBonus)})`}
            </div>
            <div>@</div>
            <div>Lv.{level}</div>
          </Flex>
        }
        <IngredientIconsFromMeal meal={meal}/>
      </Flex>
    </Flex>
  );
};
