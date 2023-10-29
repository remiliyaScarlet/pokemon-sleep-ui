import React from 'react';

import {useTranslations} from 'next-intl';

import {NumberInputRequiredProps} from '@/components/shared/input/number/required/type';
import {NumberSliderRequired} from '@/components/shared/input/number/required/withSlider';


export const MealLevelInput = (props: NumberInputRequiredProps) => {
  const t = useTranslations('UI.InPage.Cooking');

  return (
    <NumberSliderRequired
      id="RecipeLevel"
      text={t('RecipeLevel')}
      {...props}
    />
  );
};
