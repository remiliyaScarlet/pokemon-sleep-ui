import React from 'react';

import {clsx} from 'clsx';

import {Slider} from '@/components/input/slider';
import {Flex} from '@/components/layout/flex';
import {LevelInput} from '@/components/shared/input/levelInput';
import {LevelSliderProps} from '@/components/shared/input/type';


export type Props = LevelSliderProps & {
  id: string,
  text: string,
};

export const LevelSlider = (props: Props) => {
  const {id, level, minLevel = 1, maxLevel, setLevel, noSameLine} = props;

  return (
    <Flex direction="col" className={clsx('items-center gap-1.5', !noSameLine && 'lg:flex-row')}>
      <LevelInput {...props} minLevel={minLevel}/>
      <Slider id={id} value={level} setValue={setLevel} min={minLevel} max={maxLevel}/>
    </Flex>
  );
};
