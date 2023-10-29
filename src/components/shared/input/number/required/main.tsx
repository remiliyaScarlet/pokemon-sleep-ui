import React from 'react';

import ChevronDownIcon from '@heroicons/react/24/solid/ChevronDownIcon';
import ChevronUpIcon from '@heroicons/react/24/solid/ChevronUpIcon';
import {clsx} from 'clsx';

import {InputBox} from '@/components/input/box';
import {Flex} from '@/components/layout/flex/common';
import {changeButtonClass} from '@/components/shared/input/number/const';
import {NumberInputRequiredProps} from '@/components/shared/input/number/required/type';


export type Props = NumberInputRequiredProps & {
  id: string,
  text: string | null,
  textClassName?: string,
};

export const NumberInputRequired = ({value, min = 1, max = Infinity, setValue, id, text, textClassName}: Props) => {
  return (
    <Flex direction="row" noFullWidth className={clsx(
      'items-center gap-1.5 self-end',
    )}>
      {
        text &&
        <div className={clsx('whitespace-nowrap', textClassName)}>
          {text}
        </div>
      }
      <button
        className={changeButtonClass}
        disabled={value === min}
        onClick={() => setValue(Math.max(value - 1, min))}
      >
        <ChevronDownIcon/>
      </button>
      <InputBox
        id={id}
        value={value.toString()}
        type="number"
        className="w-12 text-center"
        onChange={({target}) => {
          const value = parseInt(target.value || '0');

          if (isNaN(value)) {
            return;
          }

          setValue(Math.max(min, Math.min(value, max)));
        }}
      />
      <button
        className={changeButtonClass}
        disabled={value === max}
        onClick={() => setValue(Math.min(value + 1, max))}
      >
        <ChevronUpIcon/>
      </button>
    </Flex>
  );
};
