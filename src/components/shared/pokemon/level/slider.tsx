import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/preset/text';
import {Flex} from '@/components/layout/flex/common';
import {LevelIcon} from '@/components/shared/icon/lv';
import {NumberSliderRequiredProps} from '@/components/shared/input/number/required/type';
import {NumberSliderRequired} from '@/components/shared/input/number/required/withSlider';
import {iconFilterButtonStyle} from '@/styles/input';
import {pokemonKeyLevels} from '@/types/game/pokemon/level';


export const PokemonLevelSlider = (props: Omit<NumberSliderRequiredProps, 'text'>) => {
  const {setValue} = props;

  const t = useTranslations('UI.InPage.Pokedex.Info');

  return (
    <Flex className="gap-1.5">
      <NumberSliderRequired
        text={t('PokemonLevel')}
        {...props}
      />
      <FilterTextInput
        title={
          <Flex center>
            <LevelIcon/>
          </Flex>
        }
        ids={[...pokemonKeyLevels].sort((a, b) => a - b)}
        idToText={(level) => level.toString()}
        onClick={setValue}
        isActive={() => false}
        className={iconFilterButtonStyle}
      />
    </Flex>
  );
};
