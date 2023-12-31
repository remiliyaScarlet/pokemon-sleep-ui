import React from 'react';

import {clsx} from 'clsx';

import {Slider} from '@/components/input/slider';
import {Flex} from '@/components/layout/flex/common';
import {NumberInputRequired} from '@/components/shared/input/number/required/main';
import {NumberSliderRequiredProps} from '@/components/shared/input/number/required/type';


export const NumberSliderRequired = (props: NumberSliderRequiredProps) => {
  const {value, min = 1, max, setValue, noSameLine} = props;

  return (
    <Flex className={clsx('items-center gap-1.5', !noSameLine && 'lg:flex-row')}>
      <NumberInputRequired {...props} min={min}/>
      <Slider value={value} setValue={setValue} min={min} max={max}/>
    </Flex>
  );
};
