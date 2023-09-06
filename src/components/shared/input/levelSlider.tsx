import React from 'react';

import {clsx} from 'clsx';

import {InputBox} from '@/components/input/box';
import {Slider} from '@/components/input/slider';
import {Flex} from '@/components/layout/flex';
import {LevelSliderProps} from '@/components/shared/input/type';


export type Props = LevelSliderProps & {
  id: string,
  text: string,
};

export const LevelSlider = ({id, text, level, minLevel = 1, maxLevel, setLevel, noSameLine}: Props) => {
  return (
    <Flex direction="col" className={clsx('items-center gap-1.5', !noSameLine && 'lg:flex-row')}>
      <Flex direction="row" noFullWidth className={clsx(
        'gap-1.5 self-end', !noSameLine && 'lg:mr-auto lg:self-auto',
      )}>
        <div className="whitespace-nowrap">
          {text}
        </div>
        <InputBox
          value={level.toString()}
          type="number"
          className="w-12 text-center"
          onChange={({target}) => {
            const level = parseInt(target.value || '0');

            if (isNaN(level)) {
              return;
            }

            setLevel(Math.min(level, maxLevel));
          }}
        />
      </Flex>
      <Slider id={id} value={level} setValue={setLevel} min={minLevel} max={maxLevel}/>
    </Flex>
  );
};
