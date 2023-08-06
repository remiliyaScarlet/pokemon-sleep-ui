'use client';
import React from 'react';

import {useTranslations} from 'next-intl';

import {Slider} from '@/components/input/slider';
import {Flex} from '@/components/layout/flex';
import {ColoredEnergyIcon} from '@/components/shared/pokemon/energy/colored';
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
    <Flex direction="col" className="gap-1">
      <Flex direction="row" className="gap-1">
        <div className="whitespace-nowrap">
          {t('RecipeLevel')}
        </div>
        <div>
          {level}
        </div>
      </Flex>
      <Slider id={`recipeLevel-${id}`} value={level} setValue={setLevel} min={1} max={levels.length}/>
      <Flex direction="row" className="ml-auto items-center justify-end gap-1">
        <ColoredEnergyIcon dimension="h-4 w-4" alt={t('Energy')}/>
        <div className="text-sm">
          {formatInt(atLevel.energy)} (+{formatInt(diffVal)} / +{diffPct.toFixed(0)}%)
        </div>
      </Flex>
    </Flex>
  );
};
