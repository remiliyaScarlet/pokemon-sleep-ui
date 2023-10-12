import React from 'react';

import {InputRow} from '@/components/input/filter/row';
import {Flex} from '@/components/layout/flex/common';
import {LevelSliderProps} from '@/components/shared/input/type';
import {PokemonLevelSlider} from '@/components/shared/pokemon/level/slider';


export const PokemonLevelSliderRow = (props: LevelSliderProps) => {
  return (
    <InputRow>
      <Flex className="p-1">
        <PokemonLevelSlider {...props}/>
      </Flex>
    </InputRow>
  );
};
