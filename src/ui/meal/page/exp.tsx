'use client';
import React from 'react';

import {useTranslations} from 'next-intl';

import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {InfoSlider} from '@/components/shared/input/infoSlider';
import {MealCommonProps} from '@/ui/meal/page/type';
import {getMealFinalStrength} from '@/utils/game/meal/main';
import {formatMealStrengthInfo} from '@/utils/game/meal/utils';


export const MealExp = ({meal, ingredientMap, calculatedSettings}: MealCommonProps) => {
  const {id, levels} = meal;

  const t = useTranslations('UI.InPage.Cooking');
  const [level, setLevel] = React.useState(1);

  const mapBonus = calculatedSettings.bonus.map;
  const mealStrengthInfo = React.useMemo(() => getMealFinalStrength({
    filler: [],
    level,
    meal,
    ingredientMap,
    mapBonus,
  }), [meal, ingredientMap, level, mapBonus]);

  return (
    <InfoSlider
      title={t('RecipeLevel')} id={`recipeLevel-${id}`}
      level={level} setLevel={setLevel} maxLevel={levels.length}
    >
      <ColoredEnergyIcon dimension="h-4 w-4" alt={t('Energy')}/>
      <div className="text-sm">
        {formatMealStrengthInfo(mealStrengthInfo)}
      </div>
    </InfoSlider>
  );
};
