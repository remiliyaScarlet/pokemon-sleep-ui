import React from 'react';

import {InputBox} from '@/components/input/box';
import {Slider} from '@/components/input/slider';
import {Flex} from '@/components/layout/flex';


export type TeamAnalysisBonusSliderProps = {
  bonus: number,
  setBonus: (newValue: number) => void,
  id: string,
  min: number,
  max: number,
};

export const TeamAnalysisBonusSlider = ({
  bonus,
  setBonus,
  id,
  min,
  max,
  children,
}: React.PropsWithChildren<TeamAnalysisBonusSliderProps>) => {
  return (
    <Flex direction="col" className="gap-2 p-1">
      <Flex direction="row" className="items-center justify-end gap-2">
        <Flex direction="row" noFullWidth>
          {children}
        </Flex>
        <InputBox
          id={id}
          type="number"
          min={min}
          max={max}
          className="w-16 text-center"
          value={bonus}
          onChange={({target}) => setBonus(Number(target.value))}
        />
        <div>
          %
        </div>
      </Flex>
      <Slider id={`${id}-slider`} value={bonus} setValue={setBonus} min={min} max={max}/>
    </Flex>
  );
};
