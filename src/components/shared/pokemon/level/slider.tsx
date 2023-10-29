import React from 'react';

import {useTranslations} from 'next-intl';

import {NumberSliderRequiredProps} from '@/components/shared/input/number/required/type';
import {NumberSliderRequired} from '@/components/shared/input/number/required/withSlider';


export const PokemonLevelSlider = (props: Omit<NumberSliderRequiredProps, 'text'>) => {
  const t = useTranslations('UI.InPage.Pokedex.Info');

  return (
    <NumberSliderRequired
      text={t('PokemonLevel')}
      {...props}
    />
  );
};
