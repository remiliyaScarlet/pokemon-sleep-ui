import React from 'react';

import {clsx} from 'clsx';


type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'value'> & {
  id: string,
  value: number,
  setValue: (newValue: number) => void,
};

export const Slider = ({id, value, setValue, max, ...props}: Props) => {
  return (
    <input
      id={id}
      type="range"
      value={value}
      onChange={({target}) => {
        const level = parseInt(target.value || '0');

        if (isNaN(level)) {
          return;
        }

        setValue(max ? Math.min(level, typeof max === 'string' ? parseInt(max) : max) : level);
      }}
      className={clsx(
        'h-2 w-full cursor-pointer appearance-none rounded-lg',
        'bg-slate-400/50 accent-slate-600/50 dark:bg-slate-700/70 dark:accent-slate-300/50',
      )}
      {...props}
    />
  );
};
