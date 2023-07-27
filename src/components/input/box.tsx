import React from 'react';

import {classNames} from '@/utils/react';


type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const InputBox = ({className, ...props}: Props) => (
  <input
    className={classNames(
      'focus:outline-none bg-transparent border-b border-gray-700',
      className,
    )}
    {...props}
  />
);
