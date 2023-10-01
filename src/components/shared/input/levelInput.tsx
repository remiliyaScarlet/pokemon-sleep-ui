import React from 'react';

import ChevronDownIcon from '@heroicons/react/24/solid/ChevronDownIcon';
import ChevronUpIcon from '@heroicons/react/24/solid/ChevronUpIcon';
import {clsx} from 'clsx';

import {InputBox} from '@/components/input/box';
import {Flex} from '@/components/layout/flex';
import {LevelInputProps} from '@/components/shared/input/type';


export type Props = LevelInputProps & {
  id: string,
  text: string,
  textClassName?: string,
};

export const LevelInput = ({level, minLevel = 1, maxLevel, setLevel, id, text, textClassName}: Props) => {
  const levelChangeClass = 'enabled:button-clickable-bg disabled:button-disabled h-6 w-6 p-1';

  return (
    <Flex direction="row" noFullWidth className={clsx(
      'items-center gap-1.5 self-end',
    )}>
      <div className={clsx('whitespace-nowrap', textClassName)}>
        {text}
      </div>
      <button
        className={levelChangeClass}
        disabled={level === minLevel}
        onClick={() => setLevel(Math.max(level - 1, minLevel))}
      >
        <ChevronDownIcon/>
      </button>
      <InputBox
        id={id}
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
      <button
        className={levelChangeClass}
        disabled={level === maxLevel}
        onClick={() => setLevel(Math.min(level + 1, maxLevel))}
      >
        <ChevronUpIcon/>
      </button>
    </Flex>
  );
};
