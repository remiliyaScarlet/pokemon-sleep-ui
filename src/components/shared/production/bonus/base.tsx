import React from 'react';

import {InputBox} from '@/components/input/box';
import {Slider} from '@/components/input/slider';
import {Flex} from '@/components/layout/flex/common';
import {BonusSliderProps} from '@/components/shared/production/bonus/type';


type Props = BonusSliderProps & {
  id: string,
  min: number,
  max: number,
  step?: number,
};

export const BonusSlider = ({id, min, max, step, value, setValue, children}: React.PropsWithChildren<Props>) => {
  return (
    <Flex className="gap-2 p-1">
      <Flex direction="row" className="items-center justify-end gap-2">
        <Flex direction="row" noFullWidth>
          {children}
        </Flex>
        <InputBox
          id={id}
          type="number"
          min={min}
          max={max}
          step={step ?? 1}
          className="w-16 text-center"
          value={value.toString()}
          onChange={({target}) => setValue(Number(target.value))}
        />
        <div>
          %
        </div>
      </Flex>
      <Slider id={`${id}-slider`} value={value} setValue={setValue} min={min} max={max} step={step}/>
    </Flex>
  );
};
