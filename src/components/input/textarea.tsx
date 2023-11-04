import React from 'react';

import {clsx} from 'clsx';


type Props = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'> & {
  value: string,
  setValue: (updated: string) => void,
};

export const InputTextArea = ({className, rows, value, setValue, ...props}: Props) => (
  <textarea
    className={clsx(
      'rounded-lg border border-gray-700 bg-white/50 p-2 focus:outline-none dark:bg-black/50',
      className,
    )}
    autoFocus={false}
    value={value}
    onChange={({target}) => setValue(target.value)}
    rows={rows ?? 10}
    {...props}
  />
);
