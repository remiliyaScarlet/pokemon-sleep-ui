'use client';
import React from 'react';

import {useTranslations} from 'next-intl';

import {Slider} from '@/components/input/slider';
import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {imageIconSizes} from '@/styles/image';
import {MealMetaProps} from '@/ui/meal/page/type';
import {getMealEnergyInfo} from '@/utils/game/meal';


export const MealExp = ({meal, ingredients}: MealMetaProps) => {
  const {id, levels} = meal;

  const t = useTranslations('UI.InPage.Cooking');
  const [level, setLevel] = React.useState(1);

  const {atLevel, diffVal, diffPct} = React.useMemo(() => getMealEnergyInfo({
    meal,
    ingredients,
    level,
  }), [meal, ingredients, level]);

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
      <Slider
        id={`mealExp-${id}`}
        value={level}
        setValue={setLevel}
        min={1}
        max={levels.length}
      />
      <Flex direction="row" className="ml-auto items-center justify-end gap-1">
        <div className="relative h-4 w-4">
          <NextImage src="/images/generic/energy.png" alt={t('Energy')} sizes={imageIconSizes}/>
        </div>
        <div className="text-sm">
          {atLevel.energy} (+{diffVal} / +{diffPct.toFixed(0)}%)
        </div>
      </Flex>
    </Flex>
  );
};
