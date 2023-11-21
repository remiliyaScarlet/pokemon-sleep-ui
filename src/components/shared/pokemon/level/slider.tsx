import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterCategoryInput} from '@/components/input/filter/category';
import {getIconFilterButtonClass} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex/common';
import {LevelIcon} from '@/components/shared/icon/lv';
import {NumberSliderRequiredProps} from '@/components/shared/input/number/required/type';
import {NumberSliderRequired} from '@/components/shared/input/number/required/withSlider';


type Props = Omit<NumberSliderRequiredProps, 'text'> & {
  idPrefix?: string,
  presetLevels?: number[],
};

export const PokemonLevelSlider = ({presetLevels, idPrefix, ...props}: Props) => {
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
        <FilterCategoryInput
          title={
            <Flex center>
              <LevelIcon/>
            </Flex>
          }
          ids={presetLevels.sort((a, b) => a - b)}
          idToButton={(level) => level}
          getClassNames={getIconFilterButtonClass}
          onClick={setValue}
          isActive={() => false}
        />
      }
    </Flex>
  );
};
