import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {LevelIcon} from '@/components/shared/icon/lv';
import {NumberSliderRequiredProps} from '@/components/shared/input/number/required/type';
import {NumberPresetRequired} from '@/components/shared/input/number/required/withPreset';
import {pokemonKeyLevels} from '@/types/game/pokemon/level';


export const PokemonLevelSlider = (props: Omit<NumberSliderRequiredProps, 'text'>) => {
  const t = useTranslations('UI.InPage.Pokedex.Info');

  return (
    <NumberPresetRequired
      sliderTitle={t('PokemonLevel')}
      presetTitle={
        <Flex center>
          <LevelIcon/>
        </Flex>
      }
      presetValues={[...pokemonKeyLevels]}
      {...props}
    />
  );
};
