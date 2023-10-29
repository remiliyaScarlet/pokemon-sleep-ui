import React from 'react';

import {useTranslations} from 'next-intl';

import {NumberSliderRequiredProps} from '@/components/shared/input/number/required/type';
import {NumberSliderRequired} from '@/components/shared/input/number/required/withSlider';


export const PokemonLevelSlider = (props: NumberSliderRequiredProps) => {
  const t = useTranslations('UI.InPage.Pokedex.Info');

  return (
    <NumberSliderRequired
      id="PokemonLevel"
      text={t('PokemonLevel')}
      {...props}
    />
  );
};
