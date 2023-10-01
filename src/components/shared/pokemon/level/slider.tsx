import React from 'react';

import {useTranslations} from 'next-intl';

import {LevelSlider} from '@/components/shared/input/levelSlider';
import {LevelSliderProps} from '@/components/shared/input/type';


export const PokemonLevelSlider = (props: LevelSliderProps) => {
  const t = useTranslations('UI.InPage.Pokedex.Info');

  return (
    <LevelSlider
      id="PokemonLevel"
      text={t('PokemonLevel')}
      {...props}
    />
  );
};
