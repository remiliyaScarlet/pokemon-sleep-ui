import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/text';
import {Flex} from '@/components/layout/flex/common';
import {LevelIcon} from '@/components/shared/icon/lv';
import {NumberSliderRequiredProps} from '@/components/shared/input/number/required/type';
import {NumberSliderRequired} from '@/components/shared/input/number/required/withSlider';
import {iconFilterButtonStyle} from '@/styles/input';


type Props = Omit<NumberSliderRequiredProps, 'text'> & {
  presetLevels?: number[],
};

export const PokemonLevelSlider = ({presetLevels, ...props}: Props) => {
  const {setValue} = props;

  const t = useTranslations('UI.InPage.Pokedex.Info');

  return (
    <Flex className="gap-1.5">
      <NumberSliderRequired
        text={t('PokemonLevel')}
        {...props}
      />
      {
        presetLevels?.length &&
        <FilterTextInput
          title={
            <Flex center>
              <LevelIcon/>
            </Flex>
          }
          ids={presetLevels.sort((a, b) => a - b)}
          idToButton={(level) => level}
          classNameOfButton={iconFilterButtonStyle}
          onClick={setValue}
          isActive={() => false}
        />
      }
    </Flex>
  );
};
