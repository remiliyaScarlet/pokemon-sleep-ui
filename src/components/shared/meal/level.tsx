import React from 'react';

import {useTranslations} from 'next-intl';

import {NumberInputLayoutProps} from '@/components/shared/input/number/common/type';
import {NumberSliderRequired} from '@/components/shared/input/number/required/withSlider';


export const MealLevelInput = (props: Omit<NumberInputLayoutProps, 'text'>) => {
  const t = useTranslations('UI.InPage.Cooking');

  return (
    <NumberSliderRequired
      text={t('RecipeLevel')}
      {...props}
    />
  );
};
