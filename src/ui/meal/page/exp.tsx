'use client';
import React from 'react';

import {useTranslations} from 'next-intl';

import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {InfoSlider} from '@/components/shared/input/infoSlider';
import {MealCommonProps} from '@/ui/meal/page/type';
import {getMealEnergyInfo} from '@/utils/game/meal';
import {formatInt} from '@/utils/number';


export const MealExp = ({meal, ingredientMap}: MealCommonProps) => {
  const {id, levels} = meal;

  const t = useTranslations('UI.InPage.Cooking');
  const [level, setLevel] = React.useState(1);

  const {atLevel, diffVal, diffPct} = React.useMemo(() => getMealEnergyInfo({
    meal,
    ingredientMap,
    level,
  }), [meal, ingredientMap, level]);

  return (
    <InfoSlider
      title={t('RecipeLevel')} id={`recipeLevel-${id}`}
      level={level} setLevel={setLevel} maxLevel={levels.length}
    >
      <ColoredEnergyIcon dimension="h-4 w-4" alt={t('Energy')}/>
      <div className="text-sm">
        {formatInt(atLevel.energy)} (+{formatInt(diffVal)} / +{diffPct.toFixed(0)}%)
      </div>
    </InfoSlider>
  );
};
