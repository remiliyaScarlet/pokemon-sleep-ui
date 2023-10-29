import React from 'react';

import {InputRow} from '@/components/input/filter/row';
import {Flex} from '@/components/layout/flex/common';
import {NumberSliderRequiredProps} from '@/components/shared/input/number/required/type';
import {PokemonLevelSlider} from '@/components/shared/pokemon/level/slider';


export const PokemonLevelSliderRow = (props: NumberSliderRequiredProps) => {
  return (
    <InputRow>
      <Flex className="p-1">
        <PokemonLevelSlider {...props}/>
      </Flex>
    </InputRow>
  );
};
