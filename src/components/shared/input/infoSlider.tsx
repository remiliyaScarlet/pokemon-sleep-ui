import React from 'react';

import {Slider} from '@/components/input/slider';
import {Flex} from '@/components/layout/flex/common';


type Props = {
  title: React.ReactNode,
  id: string,
  level: number,
  setLevel: (level: number) => void,
  maxLevel: number,
};

export const InfoSlider = ({title, id, level, setLevel, maxLevel, children}: React.PropsWithChildren<Props>) => {
  return (
    <Flex direction="col" className="gap-1">
      <Flex direction="row" className="gap-1">
        <div className="whitespace-nowrap">
          {title}
        </div>
        <div>
          {level}
        </div>
      </Flex>
      <Slider id={id} value={level} setValue={setLevel} min={1} max={maxLevel}/>
      <Flex direction="row" className="ml-auto items-center justify-end gap-1">
        {children}
      </Flex>
    </Flex>
  );
};
