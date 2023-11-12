import React from 'react';

import {Slider} from '@/components/input/slider';
import {Flex} from '@/components/layout/flex/common';


type Props = {
  title: React.ReactNode,
  value: number,
  setValue: (level: number) => void,
  maxValue: number,
};

export const InfoSlider = ({title, value, setValue, maxValue, children}: React.PropsWithChildren<Props>) => {
  return (
    <Flex className="gap-1">
      <Flex direction="row" className="gap-1">
        <div className="whitespace-nowrap">
          {title}
        </div>
        <div>
          {value}
        </div>
      </Flex>
      <Slider value={value} setValue={setValue} min={1} max={maxValue}/>
      <Flex direction="row" className="ml-auto items-center justify-end gap-1">
        {children}
      </Flex>
    </Flex>
  );
};
