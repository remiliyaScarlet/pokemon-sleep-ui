import React from 'react';

import {useTranslations} from 'next-intl';

import {LevelSlider} from '@/components/shared/input/levelSlider';
import {LevelInputProps} from '@/components/shared/input/type';


export const MealLevelInput = (props: LevelInputProps) => {
  const t = useTranslations('UI.InPage.Cooking');

  return (
    <LevelSlider
      id="RecipeLevel"
      text={t('RecipeLevel')}
      {...props}
    />
  );
};
